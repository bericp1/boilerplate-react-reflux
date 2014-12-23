module.exports = function(config){
  if(typeof config !== 'object')
    config = {};
  if(typeof config.build !== 'object')
    config.build = {};
  if(typeof config.build.development !== 'object')
    config.build.development = {};
  if(typeof config.build.production !== 'object')
    config.build.production = {};
  return config;
};
