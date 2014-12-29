module.exports = function(options){

  options = options || {};

  // Require third-party libs and instantiate app
  var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

    mongoose = require('mongoose'),

    // Detect environment
    environment = process.env.NODE_ENV || 'production',

    // Load app config and mould it to environment
    moulder = require('./lib/config-moulder'),
    config = moulder(require('./config'), environment).server,

    port = options.port || process.env.PORT || config.port;

  // Decide which logging interface to use.
  // Attach it to `app` so that required route modules, etc. can use it
  app.logger = options.logger || console.log.bind(console);

  // If in a dev environment, enable verbose logging for incoming requests
  if(environment === 'development')
    app.use(function(req, res, next){
      app.logger(req.method + ' ' + req.path);
      next();
    });

  // Body-parsing middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Connect to mongodb
  mongoose.connect(process.env.MONGOLAB_URI || config.mongodbURI);

  mongoose.connection.on('error', function(err){
    app.logger('mongodb connection error: ', err);
  });

  mongoose.connection.once('open', function(){

    // Custom routing can now be attached here

    // Uncomment to simulate error
    // app.use('/assets/posts.json', function(req, res, next){
    //   res.status(500).send({error: 'This is a serverside error.'});
    // });

    // Attach the example router
    app.use('/api/notes', require('./routes/api.notes-example'));

    // Serve static files from `public/dist`
    app.use(express.static(__dirname + '/public/dist'));

    // Fire up on `port`
    app.listen(port, function(){
      app.logger('Detected environment:', environment);
      app.logger('Serving on port:', port);
    });
  });
};
