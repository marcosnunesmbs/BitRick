
const response = []
response['notfound'] = []
response['welcome'] = []
response['bye'] = []

response['notfound'][0] = 'Cara, não entendi nada que disse!'
response['notfound'][1] = 'Pode falar novamente?'
response['notfound'][2] = 'Acho que não tenho programação ainda pra entender isto!'

response['welcome'][0] = 'E ai, %name que que vc manda?'
response['welcome'][1] = 'Fala %name. Qual é a boa? BUUUUUUUURP!'
response['welcome'][2] = 'Você por ai? Diz logo o que você quer, %name'

response['bye'][0] = 'Até mais, %name'
response['bye'][1] = 'A gente se vê em outr dimensão! Adeus'
response['bye'][2] = 'BUUUUUUUURP! Beleza, até mais'
var responses = {
    get: ((type, username) => {
        let num = Math.floor(Math.random() * 3)
        let phrase = response[type][num]
        return phrase.replace('%name', username)
    })
}
module.exports = responses