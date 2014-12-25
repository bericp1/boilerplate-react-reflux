var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

var config = require('./config.js').server;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/dist'));

var port = process.env.PORT || config.port;

app.listen(port, function(){
  console.info('Serving on port:', port);
});
