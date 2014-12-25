module.exports = {
  build: {
    development: {
      vendor: [
        './node_modules/es5-shim/es5-shim.js',
        './node_modules/jquery/dist/jquery.js'
      ]
    },
    production: {
      vendor: [
        './node_modules/es5-shim/es5-shim.min.js',
        './node_modules/jquery/dist/jquery.min.js'
      ]
    }
  },
  server: {
    port: 8000
  }
};
