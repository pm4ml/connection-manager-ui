module.exports = function override(config, env) {
  
  config.module.rules[2].oneOf[0] = {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
  };
  return config;
}
