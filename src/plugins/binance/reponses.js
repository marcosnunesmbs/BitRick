
const response = []
response['notfound'] = []
response['balanceError'] = []
response['tradeError'] = []
response['ordersError'] = []

response['notfound'][0] = 'Cara, não entendi nada que disse!'
response['notfound'][1] = 'Pode falar novamente?'
response['notfound'][2] = 'Acho que não tenho programação ainda pra entender isto!'

response['balanceError'][0] = "Tenho cara de adivinho, man???\nFala qual moeda quer saber o saldo. Ex:\nbsaldo BTC"
response['balanceError'][1] = "Já te falei uma vez que não é assim!\nDigita a moeda também, ex:\nbsaldo BTC"
response['balanceError'][2] = "Se você não disser que moeda quer salber o saldo... fica difícil.\nSiga o exemplo:\nbsaldo BTC"

response['tradeError'][0] = "Cotação de qual par de moeda? Sou um robô, não a mãe Diná?\nFaz assim: btrade BTCBNB"
response['tradeError'][1] = "Que cotação é essa cara?? Digita direio pra eu procurar!\nAssim: btrade BTCBNB"
response['tradeError'][2] = "Tô cansado já! Digita direito pra eu pesquisar! \nAssim: btrade BTCBNB"

response['ordersError'][0] = "Digita direito pra eu pesquisar! \nAssim: bordens BTCBNB"
response['ordersError'][1] = "Digita direito pra eu pesquisar! \nAssim: bordens BTCBNB"
response['ordersError'][2] = "Digita direito pra eu pesquisar! \nAssim: bordens BTCBNB"
var responses = {
    get: ((type, username) => {
        let num = Math.floor(Math.random() * 3)
        let phrase = response[type][num]
        return phrase.replace('%name', username)
    })
}
module.exports = responses