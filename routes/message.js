var express = require('express')
  , router = express.Router()
  , Client = require('node-xmpp-client')
  , config = require('../config.js');

/* GET messages. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  var client = new Client({
    jid: config.botUsername,
    password: config.botPassword
  })

  client.on('online', function() {
    console.log('online')
    res.send();
  })

  client.on('stanza', function(stanza) {
    console.log('Incoming stanza: ', stanza.toString())
  })



});

module.exports = router;
