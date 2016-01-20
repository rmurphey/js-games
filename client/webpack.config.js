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
  devServer : {
    contentBase : __dirname
  }
};
