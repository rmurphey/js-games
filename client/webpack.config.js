var path = require('path');

module.exports = {
  context : __dirname,
  entry : {
    'number-guessing' : './number-guessing/index'
  },
  output : {
    path : path.join(__dirname, 'dist'),
    filename : "[name].js"
  },
  module : {
    loaders : [
      {
        test : /.js$/,
        exclude : /node_modules/,
        loader : 'babel',
        query : {
          cacheDirectory : !(process.env.NODE_ENV === 'production'),
          presets : [
            'es2015'
          ]
        }
      }
    ]
  },
  devServer : {
    contentBase : __dirname
  }
};
