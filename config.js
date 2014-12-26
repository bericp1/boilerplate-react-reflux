module.exports = {
  build: {
    // Will be concated and included in index.html before app bundle
    vendor: []
  },
  server: {
    // Port to run on. Overridden by PORT env variable or port passed as an
    // option to server.js
    port: 8000
  },
  // Merges into config if NODE_ENV is development
  development: {
    build: {
      vendor: [
        './node_modules/es5-shim/es5-shim.js',
        './node_modules/jquery/dist/jquery.js'
      ]
    }
  },
  // Merges into config if NODE_ENV is production
  production: {
    build: {
      vendor: [
        './node_modules/es5-shim/es5-shim.min.js',
        './node_modules/jquery/dist/jquery.min.js'
      ]
    }
  }
};
