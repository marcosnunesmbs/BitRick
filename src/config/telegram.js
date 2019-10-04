const TelegramBot = require('node-telegram-bot-api')
var config = require("./config.json")
const token = config.botToken
const bot = new TelegramBot(token, {polling: true})

module.exports = bot