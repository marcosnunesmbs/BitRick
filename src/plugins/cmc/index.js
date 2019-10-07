const CoinMC = require('./services/cmc')
const { bot } = require('../../config/telegram')
var responses = require('./reponses')
var config = require('./config.json')


    bot.command('cmconvert', (ctx) => {
        var userName =  ctx.from.first_name
        var props = ctx.message.text.split(" ")        
        if (props.length < 2 || !props[1] || !props[2] || !props[3]) {
            ctx.replyWithMarkdown(responses.get('balanceError', userName))
        } else {
            var a = props[2].toUpperCase()
            var b = props[3].toUpperCase()
            CoinMC.convert(props[1], a, b, userName)
            .then(resp => ctx.replyWithMarkdown(resp))
        }
    })

module.exports = {
    config
}
