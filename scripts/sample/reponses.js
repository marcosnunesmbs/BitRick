
const response = []
response['sample'] = []

response['sample'][0] = 'Olá, %name!'
response['sample'][1] = 'Oi. Tudo bem %name?'
response['sample'][2] = 'HEHEE OIIII %name'

var responses = {
    get: ((type, username) => {
        let num = Math.floor(Math.random() * 3)
        let phrase = response[type][num]
        return phrase.replace('%name', username)
    })
}
module.exports = responses