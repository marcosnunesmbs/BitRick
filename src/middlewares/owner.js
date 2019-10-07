const config = require('../config/config.json')
var isMyOwner = async (ctx, next) => {
    if (
        (ctx.update.message && ctx.update.message.from.id === config.TelegramID) || 
        (ctx.update.callback_query && ctx.update.callback_query.from.id === config.TelegramID)
        ) {
        next()
    } else {
        await ctx.reply("iiiih, não posso falar com você, cara")
    }
}

module.exports = isMyOwner
