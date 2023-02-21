const Services = require('./service/service')
const { bot } = require('../../config/telegram')
const { Extra } = require('../../config/telegram')
const { Markup } = require('../../config/telegram')


var responses = require('./reponses')
var config = require('./config.json')

    bot.command('sample', ctx => {
        var userName =  ctx.from.first_name
        Services.sample(userName)
            .then(resp => ctx.reply(resp))
    })
    bot.command('samplehelp', ctx => {
        ctx.reply("Este é unm texto de ajuda.")
    })

module.exports = {
    config
}
