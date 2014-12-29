module.exports = {
  build: {
    vendor: {
      // Will be concated and included in index.html before app bundle.
      js: [],
      // Will be included as an includePath for @import statements
      scss: [
        // Bootstrap is included by default and can be used with
        // `@import "bootstrap"`
        './node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }
  },
  server: {
    // Port to run on. Overridden by PORT env variable or port passed as an
    // option to server.js
    port: 8000,
    // The URI to use to connect to the app's mongodb. Overridden by MONGOLAB_URI
    // env variable
    mongodbURI: 'mongodb://localhost/test'
  },
  // Merges into config if NODE_ENV is development
  development: {
    build: {
      vendor: {
        js: [
          './node_modules/es5-shim/es5-shim.js',
          './node_modules/jquery/dist/jquery.js',
          './node_modules/bootstrap/dist/js/bootstrap.js'
        ]
      }
    }
  },
  // Merges into config if NODE_ENV is production
  production: {
    build: {
      vendor: {
        js: [
        './node_modules/es5-shim/es5-shim.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ]
      }
    }
  }
};
