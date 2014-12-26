module.exports = function(options){

  options = options || {};

  // Require third-party libs and instantiate app
  var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

    // Detect environment
    environment = process.env.NODE_ENV || 'production',

    // Load app config and mould it to environment
    moulder = require('./lib/config-moulder'),
    config = moulder(require('./config'), environment).server,

    port = options.port || process.env.PORT || config.port;

  // Decide which logging interface to use.
  // Attach it to `app` so that required route modules, etc. can use it
  app.logger = options.logger || console.info;

  // If in a dev environment, enable verbose logging for incoming requests
  if(environment === 'development')
    app.use(function(req, res, next){
      app.logger(req.method + ' ' + req.path);
      next();
    });

  // Uncomment to simulate error
  // app.use('/assets/posts.json', function(req, res, next){
  //   res.status(500).send({error: 'This is a serverside error.'});
  // });

  // Body-parsing middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Serve static files from `public/dist`
  app.use(express.static(__dirname + '/public/dist'));

  // Fire up on `port`
  app.listen(port, function(){
    app.logger('Serving on port:', port);
  });
};
