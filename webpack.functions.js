// https://github.com/netlify/netlify-faunadb-example/issues/8

const webpack = require('webpack');

module.exports = {
  plugins: [ new webpack.DefinePlugin({ "global.GENTLY": false }) ]
};