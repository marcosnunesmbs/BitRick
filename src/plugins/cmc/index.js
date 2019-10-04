const CoinMC = require('./services/cmc')
const bot = require('../../config/telegram')
var responses = require('./reponses')
var config = require('./config.json')
   
bot.on('message', (msg, match) => {
    var chatID = msg.chat.id
    var userName =  msg.from.first_name
    var cmcconvert = "cmconvert"
    var cmcconvertbuy = "cmcbuy"
    var cmcconvertsell = "cmcsell"

    if (msg.text.toString().toLowerCase().indexOf(cmcconvert) == 0) {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            CoinMC.convert(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(chatID, resp))
        }
    }
    if (msg.text.toString().toLowerCase().indexOf(cmcconvertbuy) == 0) {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            CoinMC.convertbuy(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(chatID, resp))
        }
    }
    if (msg.text.toString().toLowerCase().indexOf(cmcconvertsell) == 0) {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            CoinMC.convertsell(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(chatID, resp))
        }
    }
})

    bot.onText(/\/cmconvert/, (msg, match) => {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            
            CoinMC.convert(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    })
    bot.onText(/\/cmcbuy/, (msg, match) => {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            
            CoinMC.convertbuy(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    })
    bot.onText(/\/cmcsell/, (msg, match) => {
        var props = msg.text.split(" ")
        var a = props[2].toUpperCase()
        var b = props[3].toUpperCase()
        if (!props[1] || !props[2] || !props[3]) {
            bot.sendMessage(msg.chat.id, responses.get('balanceError', userName))
        } else {
            
            CoinMC.convertsell(props[1], a, b, msg.from.username)
            .then(resp => bot.sendMessage(msg.chat.id, resp))
        }
    })
module.exports = {
    config
}
