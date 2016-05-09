var express = require('express');
var app = express();

module.exports = {
  getJSON : function(req, res){
    console.log('hey')
    res.send('hey')
  }
}
