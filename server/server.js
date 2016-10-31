var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var morgan = require('morgan');
var app = express();
var server = http.Server(app);
var tripRouter = require('./trips');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', tripRouter);

app.use(function (error, request, response, next) {
  if (error) {
    console.log(error.message);
    response.status(500).send(error);
  }
});

server.listen(process.env.PORT || 8080);
console.log('On port 8080');

module.exports = server;
