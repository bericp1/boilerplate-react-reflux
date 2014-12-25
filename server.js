module.exports = function(options){

  options = options || {};

  var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

  var config = require('./config.js').server;

  var logger = options.logger || console.info;

  if(process.env.NODE_ENV === 'development')
    app.use(function(req, res, next){
      logger(req.method + ' ' + req.path);
      next();
    });

  // Uncomment to simulate error
  // app.use('/assets/posts.json', function(req, res, next){
  //   res.status(500).send({error: 'This is a serverside error.'});
  // });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/public/dist'));

  var port = options.port || process.env.PORT || config.port;

  app.listen(port, function(){
    logger('Serving on port:', port);
  });
};
