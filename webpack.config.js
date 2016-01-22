var path = require('path');

module.exports = {
  context : path.join(__dirname, 'client'),
  entry : {
    'number-guessing' : './number-guessing/index'
  },
  output : {
    path : path.join(__dirname, 'dist'),
    filename : '[name].js'
  },
  module : {
    loaders : [
      {
        test : /.js$/,
        exclude : /node_modules/,
        loader : 'babel',
        query : {
          cacheDirectory : true,
          presets : [
            'es2015'
          ]
        }
      }
    ]
  },
  devServer : {
    contentBase : path.join(__dirname, 'client')
  }
};
