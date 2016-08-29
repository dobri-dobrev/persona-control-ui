'use strict'

var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var hbs = require('hbs')
var fs = require('fs')
var path = require('path')
var http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: true });

// var ENCODER_HOSTNAME = process.env.ENCODER_HOSTNAME || 'localhost'
// var ENCODER_PORT = process.env.ENCODER_PORT || 3000

var ENCODER_HOSTNAME = process.env.ENCODER_HOSTNAME || '213.14.80.166'
var ENCODER_PORT = process.env.ENCODER_PORT || 3300


var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.disable('etag')

app.use(express.static(path.join(__dirname, 'public')))



app.get('/', function(req, res, next){

	res.render('main');
});

app.get('/startAd', function(req, res, next){
  var options = {};
  options.agent = keepAliveAgent;
  options.port = ENCODER_PORT;
  options.hostname = ENCODER_HOSTNAME;
  options.path = '/sgnl/adstart';
  http.get(options, function(result){
    console.log(`Got response: ${result.statusCode}`);
    res.sendStatus(result.statusCode);  
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    res.sendStatus(404);
  });
  
});

app.get('/endAd', function(req, res, next){
  var options = {};
  options.agent = keepAliveAgent;
  options.port = ENCODER_PORT;
  options.hostname = ENCODER_HOSTNAME;
  options.path = '/sgnl/adend';
  http.get(options, function(result){
    console.log(`Got response: ${result.statusCode}`);
    res.sendStatus(result.statusCode);  
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    res.sendStatus(404);
  });
  
});

app.get('/startEncoder', function(req, res, next){
  var options = {};
  options.agent = keepAliveAgent;
  options.port = ENCODER_PORT;
  options.hostname = ENCODER_HOSTNAME;
  options.path = '/sgnl/start';
  http.get(options, function(result){
    console.log(`Got response: ${result.statusCode}`);
    res.sendStatus(result.statusCode);  
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    res.sendStatus(404);
  });
  
});

app.get('/stopEncoder', function(req, res, next){
  var options = {};
  options.agent = keepAliveAgent;
  options.port = ENCODER_PORT;
  options.hostname = ENCODER_HOSTNAME;
  options.path = '/sgnl/stop';
  http.get(options, function(result){
    console.log(`Got response: ${result.statusCode}`);
    res.sendStatus(result.statusCode);  
  })
  .on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    res.sendStatus(404);
  });
  
});

app.get('/test', function(req, res, next){
  console.log("TEAST");
  res.sendStatus(200);
  
});



app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})




module.exports = app