/**
 * Model for XMPP stanzas.
 */
var mongoose = require('mongoose');
var config = require('../config.js');
mongoose.connect(config.dbURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
var stanzaSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  body: String,
  timestamp: {type: Date, default: Date.now}
})
 
Stanza = mongoose.model('Stanza', stanzaSchema);
 
module.exports = {"Stanza": Stanza};