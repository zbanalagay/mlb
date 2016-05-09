var mlbHandler = require('./mlbHandler.js');

module.exports = function(app){
  app.get('/getJSON', mlbHandler.getJSON);
}
