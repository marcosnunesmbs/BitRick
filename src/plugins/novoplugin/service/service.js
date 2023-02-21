var rp = require('request-promise')
var responses = require('../reponses')

var config = require('../config.json')


var Services = {
  // action
    sample: ((userName, resp) => {
      return new Promise(function(resolve, reject) {
        resolve(responses.get('sample', userName))
      })
    })
}
module.exports = Services