var express = require('express');
var app = express();
var request = require('request');

module.exports = {
  getJSON : function(req, res){
    request({
      url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_04/day_29/master_scoreboard.json",
      method: 'GET'
    }, function(error, response, body){
      if(error){
        console.log(error);
      } else{
        console.log(response.statusCode);
        res.status(response.statusCode).send(body);
      }
    })
  }
}
