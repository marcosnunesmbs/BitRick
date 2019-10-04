//load telegram bot
const { bot } = require('./src/config/telegram')

//load services

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
    var text = "Opa! Fique tranquilo!\nTenho acesso não autorizado aos seguintes serviços interestrelares pra você:"
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    ctx.reply(text)
})

m.forEach( function(o) {
    var mod = require('./src/plugins/'+o+'/index')
    modules.push(mod)
    bot.command( mod.config.module_name, (ctx) => {
        var text = "Consegui hackear os serviços abiaxo em " + mod.config.module_name +":"
        mod.config.functions.forEach( function(x) {
            text +=`\n /${x.keypass} = ${x.name}\n Como usar: ${x.description}\n`
        })
        ctx.reply(text)   
    })
})

//messages text
bot.on('text', (ctx) => {
    var message = ctx.message.text
    var userName =  ctx.from.first_name
    var hi = "oi"
    var bye = "xau"
    var help = "ajuda"
    if (message.toString().toLowerCase().indexOf(hi) == 0) {
        ctx.reply(responses.get('welcome', userName))
    }
    if (message.toString().toLowerCase().includes(bye)) {
        ctx.reply(responses.get('bye', userName))
    }
    if (message.toString().toLowerCase().indexOf(help) == 0) {
        ctx.reply("Opa! Fique tranquilo! \nQue tipo de ajuda você precisa?") 
    }
})


bot.launch()

//http service to receive
var app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send('welcome to BitRick Bot!');
});

app.listen(5000, function () {
    console.log('Bot listening on port 6000!');
});