/**
 * Creating an XMPP client. 
 */
var nodeXMPPClient = require('node-xmpp-client')
  , config = require('./config')
  , request = require('request')
  ;

module.exports = function() {
  Client = new nodeXMPPClient({
    jid: config.botUsername,
    password: config.botPassword, 
    host: config.botHost,
    reconnect: true
  })

  Client.on('online', function() {
    console.log('online');
    // Sending the XMPP presence stanza, so others know we're online. 
    Client.send('<presence> <show>chat</show> <status>Hello, world!</status> </presence>');
  })

  // @TODO: add functionality to receive subscription requests. 

  // @TODO: add functionality to accept subscription requests. 

  Client.on('stanza', function (stanza) {
    // Makes POST request here, while storing messages. 
    // Where should the client go? 

    console.log('Incoming stanza: ', stanza.toString());
    if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
      var message = stanza.getChildText('body');
      console.log('[MESSAGE]: ', message);
      // @TODO: store message in data store, to be retrieved by `/GET` requests.

      var form = {
        form : {
          message: message
        }
      }
      // Posts message to recipient server. 
      request.post(config.recipientURL, form, function(err, response, body) {
        if (err) {
          console.error('Error in POST request XMPP message delivery to recipient server: ', err);
        }
        console.log('POST request XMPP message delivery successful--response: ', response);
      })

    }
  })

  // Might be redundant error handling. 
  Client.on('error', function (e) {
    console.log('Error: ', e);
    console.error('Error: ', e);
  })
}
