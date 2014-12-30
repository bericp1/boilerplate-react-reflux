module.exports = function(options){

  options = options || {};

  // Require libs
  var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    moulder = require('./lib/config-moulder'),

    // Instantiate app
    app = express(),

    // Detect environment
    environment = process.env.NODE_ENV || 'production',

    // Load app config and mould it to environment
    config = moulder(require('./config'), environment).server,

    // Determine port to fire up on
    port = options.port || process.env.PORT || config.port,

    // Determine URI to use to connect to mongodb
    mongodbURI = process.env.MONGOLAB_URI || config.mongodbURI;

  // Decide which logging interface to use.
  // Attach it to `app` so that required route modules, etc. can use it
  app.logger = options.logger || console.log.bind(console);

  // Enable verbose logging for incoming requests if configured to do so
  if(config.verbose)
    app.use(function(req, res, next){
      app.logger(req.method + ' ' + req.path + ' (remote: ' + req.ip + ')');
      next();
    });

  // Body-parsing middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Pull in app-specific routing/server logic, passing it our app instance
  require('./server')(app);

  // Serve static files from `public/dist`
  app.use(express.static(__dirname + '/public/dist'));

  // Better error handling (custom 404s, etc)

  mongoose
    // Connect to mongodb
    .connect(mongodbURI)
    // Grab the connection
    .connection
    // Attach an error handler
    .on('error', function(err){
      app.logger('Mongodb connection error: ', err);
    })
    // Once connected, start the server on `port`
    .once('open', function(){
      app.listen(port, function(){
        app.logger('Connected to mongodb on', mongodbURI);
        app.logger('Detected environment:', environment);
        app.logger('Serving on port:', port);
      });
    });
};
