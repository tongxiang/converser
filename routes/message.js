var express = require('express')
  , router = express.Router()
  , Client = require('node-xmpp-client')
  , config = require('../config.js')
  , request = require('request')
  , stanzaModel = require('../models').Stanza
  ;

// Retrieves XMPP messages stored within the app, sends this as a response. 
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  
  Client.on('stanza', function(stanza) {
    console.log('Incoming stanza: ', stanza.toString())
  })

});

router.post('/send', function(req, res, next) {
  // Creates a new stanza, with the attached message, and sends it. 
  var stanza = new Client.Stanza('message', {
    to: req.param.to,
    from: config.botUsername,
    type: 'chat'
  });
  stanza.c('body').t(req.param.message);
  Client.send(stanza);
  // @TODO: check for Client.send() callback function, to send a more descriptive response. 
  res.send();
})

module.exports = router;
