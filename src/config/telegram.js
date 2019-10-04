var config = require("./config.json")

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const token = config.botToken

const bot = new Telegraf(token)

module.exports = {
    bot,
    Extra,
    Markup
}