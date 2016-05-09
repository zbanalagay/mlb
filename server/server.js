var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var middleware = require('./middleware.js');

middleware(app, express);

// app.use(express.static(__dirname + './../client'));

app.listen(port);
console.log('Now listening on port: ' + port);
