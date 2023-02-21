var _ = require('lodash')
var request = require('request')
var usdbrl = 0
var responses = require('../reponses')

var config = require('../config.json')

const binance = require('node-binance-api')().options({
  APIKEY: config.APIKEY,
  APISECRET: config.APISECRET,
  useServerTime: true,
  recvWindow: 5000, // Set a higher recvWindow to increase response timeout
  verbose: true, // Add extra output when subscribing to WebSockets, etc
  log: log => {
    console.log(log); // You can create your own logger here, or disable console output
  }
})

var Exchange = {
  // Get balance of wallet
  getBalances: ((currency, userName, resp) => {
    return new Promise(function(resolve, reject) {
      binance.balance((error, balances) => {
        if(error) { console.log(error) }
          let saldo = balances[currency.toUpperCase()] 
          if (typeof saldo === "undefined") {
            resolve(responses.get('notfound', userName))
            return
          }

          var code = currency.toUpperCase() != "USDT" ? currency.toUpperCase()+"USDT" : "BTC"+currency.toUpperCase()

          console.log(code)
          binance.prices(code, (error, ticker) => {
            if (typeof ticker === "undefined") {
              resolve(responses.get('notfound', userName))
              return
            }
            request('https://economia.awesomeapi.com.br/all/USD', { json: true }, (err, res, body) => {
            if (err) { return console.log(err) }
            let a = parseFloat(saldo.available)
            let b = parseFloat(ticker[Object.keys(ticker)[0]])
            let usdbrl = body.USD.ask
            let conversionUSD = (a*b)
            let conversionRBL = currency.toUpperCase() !== "USDT" ? (conversionUSD*parseFloat(usdbrl.replace(",", "."))) : (saldo.available*parseFloat(usdbrl.replace(",", "."))) 
            console.log(saldo)

            if (currency.toUpperCase() !== "USDT") {
              var message = "Seu saldo de " + currency.toUpperCase() + ":  " + saldo.available + "\nou em US$ " + conversionUSD +"\nou em R$ " + conversionRBL +"\nTá rico ein, Elon Musk."
            } else {
              var message = "Seu saldo de " + currency.toUpperCase() + ":  " + saldo.available + "\nou em USD " + saldo.available +"\nou em R$ " + conversionRBL +"\nTá rico ein, Elon Musk."
            }

            resolve(message)
            reject(() => {
              return console.error(error)
            })
          })
        
        })

      })

    })
  }),

  getPrice: ((symbol, userName, resp) => {
    return new Promise(function(resolve, reject) {
    var cripto = symbol+"usdt"
    binance.prices(cripto.toUpperCase(), (error, ticker) => {
        let tick = ticker
        typeof tick === "undefined" ? resolve(responses.get('notfound', userName)) :
        resolve("Cotação de " + symbol.toUpperCase() + ":\nUSDT: " + ticker[cripto.toUpperCase()])
        reject(() => {
          return console.error(error)
        })
      })
    })
  }),

  getOrders: ((symbol, userName, resp) => {
    return new Promise(function(resolve, reject) {  
      binance.allOrders(symbol.toUpperCase(), (error, orders) => {
        request('https://economia.awesomeapi.com.br/all/USD', { json: true, orders }, (err, res, body) => {
            if (err) { return console.log(err) }
            if (typeof orders.length === "undefined") {
              resolve(responses.get('notfound', userName))
              return
            }
            _.filter(orders, function(o) {
              return o.status !== "CANCELED"
            })
            var text = "--------\n"   
          orders.forEach(e => {
            let date = new Date(e.time)
            let usdbrl = body.USD.ask
            let conversionRBL = (e.cummulativeQuoteQty*parseFloat(usdbrl.replace(",", ".")))
            text += "Data: "+ date.toLocaleDateString() +"\nTipo: "+ e.side +"\nStatus: "+ e.status +"\nPreço: " + e.price + "\nQnt Origem: "+ e.origQty+"\nUS$: "+ e.cummulativeQuoteQty +"\nR$ :" + conversionRBL + "\n--------\n"
            })
          
          resolve(text)
          reject(() => {
            return console.error(error)
          })
        })
      }, {limit:5})
      
    })
  })

}
module.exports = Exchange