//load telegram bot
const bot = require('./src/config/telegram')
//load services

var express = require('express')
var bodyParser = require('body-parser')
var config  = require('./src/config/config.json')
var modules = []
//modules
m = config.modules
m.forEach( function(o) {
    var mod = require('./src/plugins/'+o+'/index')
    modules.push(mod)
    bot.onText(new RegExp("/" + mod.config.module_name), (msg) => {
        var text = "Consegui hackear os serviços abiaxo em " + mod.config.module_name +":"
        mod.config.functions.forEach( function(x) {
            text +=`\n /${x.keypass} = ${x.name}\n Como usar: ${x.description}\n`
        })
        bot.sendMessage(msg.chat.id, text)   
    })
})

//responses
var responses = require('./reponses')

//mensagens padrão
bot.on('message', (msg, match) => {
    var chatID = msg.chat.id
    var userName =  msg.from.first_name
    var hi = "oi"
    var bye = "xau"
    var help = "ajuda"
    if (msg.text.toString().toLowerCase().indexOf(hi) == 0) {
        bot.sendMessage(chatID, responses.get('welcome', userName))
    }
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(chatID, responses.get('bye', userName))
    }
    if (msg.text.toString().toLowerCase().indexOf(help) == 0) {
        bot.sendMessage(msg.chat.id, "Opa! Fique tranquilo! \nQue tipo de ajuda você precisa?") 
    }
})

//comandos gerais
bot.onText(/\/start/, (msg) => {
    var text = "Hip Hip, " + msg.from.first_name + ", eu sou o Bit Rick, seu cientista intergalático pessoal!\nQual de meus serviços você precisa?"
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    bot.sendMessage(msg.chat.id, text)
})
bot.onText(/\/ajuda/, (msg) => {
    var text = "Opa! Fique tranquilo!\nTenho acesso não autorizado aos seguintes serviços interestrelares pra você:"
    modules.forEach( function(m) {
        text +=`\n /${m.config.module_name} = ${m.config.description}`
    })
    bot.sendMessage(msg.chat.id, text)
})

//http service to receive
var app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send('welcome to BitRick Bot!');
});

app.listen(5000, function () {
    console.log('Bot listening on port 6000!');
});