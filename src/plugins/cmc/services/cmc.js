var rp = require('request-promise')
var responses = require('../reponses')

var config = require('../config.json')


var CoinMC = {
  // Get balance of wallet
    convert: ((value, a, b, userName, resp) => {
      return new Promise(function(resolve, reject) {
      var requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
        qs: {
          'symbol': a.toString().toUpperCase(),
          'amount': value,
          'convert': b.toString().toUpperCase()
        },
        headers: {
          'X-CMC_PRO_API_KEY': config.APIKEY
        },
        json: true,
        gzip: true
      }
      

      rp(requestOptions).then(response => {
        var message = value + " " + a + "\nCotação: " + response.data.quote[b].price + " " + b + "\nCompra: " + parseFloat(response.data.quote[b].price)*0.975 + " " + b +"\nVenda: " + parseFloat(response.data.quote[b].price)*1.025+ " " + b 
        console.log("CoinMarketcap Converting...")
        resolve(message)
      }).catch((err) => {
        resolve(responses.get('balanceError', userName))
        return
      })
    })
  })
}
module.exports = CoinMC