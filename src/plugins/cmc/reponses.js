
const response = []
response['balanceError'] = []

response['balanceError'][0] = "Digite o valor, a moeda de cotação e a moeda base.\nEx: cmc-convert 10 BTC USD"
response['balanceError'][1] = "Digite o valor, a moeda de cotação e a moeda base.\nEx: cmc-convert 10 BTC USD"
response['balanceError'][2] = "Digite o valor, a moeda de cotação e a moeda base.\nEx: cmc-convert 10 BTC USD"

var responses = {
    get: ((type, username) => {
        let num = Math.floor(Math.random() * 3)
        let phrase = response[type][num]
        return phrase.replace('%name', username)
    })
}
module.exports = responses