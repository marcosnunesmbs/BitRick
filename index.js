//load telegram bot
const { bot } = require('./src/config/telegram')
const { Markup } = require('./src/config/telegram')
const isMyOwner = require('./src/middlewares/owner')
bot.use(isMyOwner)
//load services
const back = Markup.inlineKeyboard([
    Markup.callbackButton('<< voltar', 'servicos'),
]).extra()

var express = require('express')
var bodyParser = require('body-parser')
var config  = require('./src/config/config.json')
var modules = []
//modules
m = config.modules


//responses
var responses = require('./reponses')

//start command
bot.start((ctx) => {
    var text = "Hip Hip, " + ctx.from.first_name + ", eu sou o Bit Rick, seu cientista intergalático pessoal!\nQual de meus serviços você precisa?"
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    ctx.reply(text)
})

//commands
bot.command('ajuda', (ctx) => {
    console.log(ctx.message.from)
    var text = "Opa! Fique tranquilo!\nTenho acesso não autorizado aos seguintes serviços interestrelares pra você:"
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    ctx.reply(text)
})
bot.action('servicos', (ctx) => {
    var text = "Não tenho acesso autorizado a uma paradas aqui pra você..."
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    ctx.reply(text)
})

m.forEach( function(o) {
    try {
        var mod = require('./src/plugins/'+o+'/index')
        modules.push(mod)
        bot.command( mod.config.module_name, (ctx) => {
            var text = "Consegui hackear os serviços abiaxo em " + mod.config.module_name +":"
            mod.config.functions.forEach( function(x) {
                text +=`\n /${x.keypass} = ${x.name}`
            })
            ctx.reply(text, back)   
        })
    } 
    catch (e) {
        console.log(e)
    }
})

//messages text
bot.hears(/^[o,O][i,I]|^[h,H][i,I]/, (ctx) => {
    var userName =  ctx.from.first_name
    ctx.reply(responses.get('welcome', userName))
})
bot.hears(/^[x,X][a,A][u,U]|[x,X][a,A][u,U]$|^[b,B][y,Y][e,E]|[b,B][y,Y][e,E]$|^[t,T][c,C][h,H][a,A][u,U]|[t,T][c,C][h,H][a,A][u,U]$/, (ctx) => {
    var userName =  ctx.from.first_name
    ctx.reply(responses.get('bye', userName))
})

bot.on('message', ctx => {
    ctx.reply("Cara, não entendi isso... qualquer coisa digite /ajuda")
})
bot.launch()

//http service to receive
var app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send('welcome to BitRick Bot!');
});

app.listen(5000, function () {
    console.log('Bot listening on port 5000!');
});