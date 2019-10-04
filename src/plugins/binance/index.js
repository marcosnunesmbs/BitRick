const Exchange = require('./services/binance')
const bot = require('../../config/telegram')
var responses = require('./reponses')
var config = require('./config.json')
   
bot.on('message', (msg, match) => {
    var chatID = msg.chat.id
    var userName =  msg.from.first_name
    var balance = "bbalance"
    var trade = "bprice"
    var orders = "borders"

    if (msg.text.toString().toLowerCase().indexOf(balance) == 0) {
        var currency = msg.text.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            Exchange.getBalances(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    }
    if (msg.text.toString().toLowerCase().indexOf(trade) == 0) {
        var currency = msg.text.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, responses.get('tradeError', userName))
        } else {
            Exchange.getPrice(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    }
    if (msg.text.toString().toLowerCase().indexOf(orders) == 0) {
        var currency = msg.text.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, responses.get('ordersError', userName))
        } else {
            Exchange.getOrders(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    }
})

    bot.onText(/\/bbalance/, (msg, match) => {
        var currency = match.input.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, "Por favor, digite /bbalance + MOEDA para saber o saldo. Ex:\n /saldo BTC")
        } else {
            Exchange.getBalances(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    })

    bot.onText(/\/bprice/, (msg, match) => {
        var currency = match.input.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, "Por favor, digite /bprice + SÍMBOLO para saber o saldo. Ex:\n /cotação BTCBNB")
        } else {
            Exchange.getPrice(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        } 
    })
    bot.onText(/\/borders/, (msg, match) => {
        var currency = match.input.split(" ")
        if (!currency[1]) {
            bot.sendMessage(msg.chat.id, "Por favor, digite /borders + SÍMBOLO para saber o saldo. Ex:\n /orders BTCBNB")
        } else {
            Exchange.getOrders(currency[1], msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        } 
    })

module.exports = {
    config
}
