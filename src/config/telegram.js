// const TelegramBot = require('node-telegram-bot-api')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')


var config = require("./config.json")
const token = config.botToken
// const bot = new TelegramBot(token, {polling: true})

const bot = new Telegraf(token)

module.exports = {
    bot,
    Extra,
    Markup
}