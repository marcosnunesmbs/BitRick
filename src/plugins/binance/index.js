const Exchange = require('./services/binance')
const { bot } = require('../../config/telegram')
const { Extra } = require('../../config/telegram')
const { Markup } = require('../../config/telegram')

var responses = require('./reponses')
var config = require('./config.json')

const balanceButtons = Markup.inlineKeyboard([
    Markup.callbackButton('BTC', 'getBalance btc'),
    Markup.callbackButton('DOGE', 'getBalance doge'),
    Markup.callbackButton('DOGE', 'getBalance doge'),
    Markup.callbackButton('BNB', 'getBalance bnb'),
    Markup.callbackButton('LINK', 'getBalance link'),
    Markup.callbackButton('DGB', 'getBalance dgb'),
    Markup.callbackButton('NANO', 'getBalance nano'),
    Markup.callbackButton('USDT', 'getBalance usdt'),
  ], { columns: 3 }).extra()

  const priceButtons = Markup.inlineKeyboard([
    Markup.callbackButton('DASH', 'getPrice dash'),
    Markup.callbackButton('DOGE', 'getPrice doge'),
    Markup.callbackButton('DOGE', 'getPrice doge'),
    Markup.callbackButton('BNB', 'getPrice bnb'),
    Markup.callbackButton('LINK', 'getPrice link'),
    Markup.callbackButton('DGB', 'getPrice dgb'),
    Markup.callbackButton('NANO', 'getPrice nano'),
    Markup.callbackButton('BTC', 'getPrice btc'),
  ], { columns: 3 }).extra()

    bot.command('bbalance', (ctx) => {
        var currency = ctx.message.text.split(" ")
        if (!currency[1]) {
            ctx.reply('Escolha uma moeda para saber o seu Saldo', balanceButtons)
        } else {
            Exchange.getBalances(currency[1], ctx.from.first_name)
            .then(resp => ctx.reply(resp))
        }
    })

    bot.command('bprice', (ctx) => {
        var currency = ctx.message.text.split(" ")
        if (!currency[1]) {
            ctx.reply('Escolha uma moeda para saber a Cotação', priceButtons)
        } else {
            Exchange.getPrice(currency[1], ctx.from.first_name)
            .then(resp => ctx.reply(resp))
        } 
    })
    bot.command('borders', (ctx) => {
        var currency = ctx.message.text.split(" ")
        if (!currency[1]) {
            ctx.reply("Por favor, digite /borders + SÍMBOLO para saber o saldo. Ex:\n /borders BTCBNB")
        } else {
            Exchange.getOrders(currency[1], ctx.from.first_name)
            .then(resp => ctx.reply(resp))
        } 
    })

    bot.action(/getBalance (\w+)/, ctx => {
        var currency = ctx.match[1]
        Exchange.getBalances(currency, ctx.from.first_name)
            .then(resp => ctx.reply(resp))
    })
    bot.action(/getPrice (\w+)/, ctx => {
        var currency = ctx.match[1]
        Exchange.getPrice(currency, ctx.from.first_name)
            .then(resp => ctx.reply(resp))
    })

module.exports = {
    config
}
