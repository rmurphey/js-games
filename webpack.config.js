var path = require('path');
var fs = require('fs');

var entries = {};

var games = fs.readdirSync(
  path.join(__dirname, 'client')
).filter((dir) => {
  return !dir.match('lib');
}).forEach((dir) => {
  entries[dir] = `./${dir}/index`;
});

module.exports = {
  context : path.join(__dirname, 'client'),
  entry : entries,
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
      },
      {
        test : /.css$/,
        loader : 'style-loader!css-loader'
      }
    ]
  },
  devServer : {
    contentBase : path.join(__dirname, 'client')
  }
};
