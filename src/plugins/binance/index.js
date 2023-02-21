const Exchange = require('./services/binance')
const { bot } = require('../../config/telegram')
const { Extra } = require('../../config/telegram')
const { Markup } = require('../../config/telegram')

const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const WizardScene = require('telegraf/scenes/wizard')

var responses = require('./reponses')
var config = require('./config.json')

let base = ""
let cotacao = ""

const baseCoinHandler = new Composer()
baseCoinHandler.hears(/\w{2,4}/, (ctx) => {
    base = ctx.match[0]
    ctx.reply('Digite a moeda de Cotação')
    return ctx.wizard.next()
})
baseCoinHandler.use((ctx) => ctx.reply('Por favor, digite o símbolo a moeda base.'))

const cotacaoHanler = new Composer()
cotacaoHanler.hears(/\w{2,4}/, (ctx) => {
    cotacao = ctx.match[0]
    let pair = `${base}${cotacao}`
    Exchange.getOrders(pair, ctx.from.first_name)
    .then((resp) =>  {
        ctx.scene.leave()
        return retuctx.reply(resp) 
    })
    .catch((err) =>{
        console.log(err)
        ctx.reply('Não consegui consultar...')
        return ctx.scene.leave()
    })
})
cotacaoHanler.use((ctx) => ctx.reply('Cara, digita a moeda de cotação logo'))

const superWizard = new WizardScene('searchorder',
  (ctx) => {
    ctx.reply('Por favor, digite a moeda base')
    ctx.wizard.next()
  },
  baseCoinHandler,
  cotacaoHanler
)

// const stage = new Stage([superWizard], { default: 'searchorder' })
// bot.use(session())
// bot.use(stage.middleware())


const balanceButtons = Markup.inlineKeyboard([
    Markup.callbackButton('BTC', 'getBalance btc'),
    Markup.callbackButton('NANO', 'getBalance nano'),
    Markup.callbackButton('USDT', 'getBalance usdt'),
    Markup.callbackButton('BNB', 'getBalance bnb'),
    Markup.callbackButton('LINK', 'getBalance link'),
    Markup.callbackButton('BAND', 'getBalance band'),
    Markup.callbackButton('OUTRA', 'helpBalance'),
  ], { columns: 3 }).extra()

  const priceButtons = Markup.inlineKeyboard([
    Markup.callbackButton('BTC', 'getPrice btc'),
    Markup.callbackButton('NANO', 'getPrice nano'),
    Markup.callbackButton('USDC', 'getPrice usdc'),
    Markup.callbackButton('BNB', 'getPrice bnb'),
    Markup.callbackButton('LINK', 'getPrice link'),
    Markup.callbackButton('BAND', 'getPrice band'),
    Markup.callbackButton('OUTRA', 'helpPrice'),
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
            // Stage.enter('searchorder')
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
    bot.action(/helpBalance/, ctx => {
        ctx.replyWithMarkdown("Digite */bbalance + MOEDA* para saber o saldo.")
    })
    bot.action(/helpPrice/, ctx => {
        ctx.replyWithMarkdown("Digite */bprice + MOEDA* para saber o saldo.")
    })

module.exports = {
    config
}
