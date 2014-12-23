module.exports = {
  build: {
    development: {
      vendor: [
        './node_modules/es5-shim/es5-shim.js'
      ]
    },
    production: {
      vendor: [
        './node_modules/es5-shim/es5-shim.min.js'
      ]
    }
  }
};
