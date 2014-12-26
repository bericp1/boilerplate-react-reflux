module.exports = {
  build: {
    vendor: []
  },
  server: {
    port: 8000
  },

  development: {
    build: {
      vendor: [
        './node_modules/es5-shim/es5-shim.js',
        './node_modules/jquery/dist/jquery.js'
      ]
    }
  },
  production: {
    build: {
      vendor: [
        './node_modules/es5-shim/es5-shim.min.js',
        './node_modules/jquery/dist/jquery.min.js'
      ]
    }
  }
};
