module.exports = function(options){

  options = options || {};

  var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

  var config = require('./config.js').server;

  var logger = options.logger || console.info;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/public/dist'));

  var port = options.port || process.env.PORT || config.port;

  app.listen(port, function(){
    logger('Serving on port:', port);
  });
};
