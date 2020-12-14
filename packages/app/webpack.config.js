const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const envConfig = {
  production: {
    NODE_ENV: 'production',
    AUTH0_CLIENT_ID: 'Ef1oatwdoaHdnOgTGAIO5r03PSqBnk5A',
    AUTH0_API_AUDIENCE: 'https://knowledge-workbench.plural.ai',
    AUTH0_DOMAIN: 'pluralai.eu.auth0.com',
    API_HOST: 'https://knowledge-workbench-api.plural.ai/',
  },
  development: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '4aHCoBoL94wgTq8LsnC0a1cwfn753vm7',
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE || 'https://knowledge-workbench.dev.plural.ai',
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || 'pluralai.eu.auth0.com',
    API_HOST: process.env.API_HOST || 'http://localhost:8080/',
  },
  skillcapital: {
    NODE_ENV: 'skillcapital',
    AUTH0_CLIENT_ID: 'Ef1oatwdoaHdnOgTGAIO5r03PSqBnk5A',
    AUTH0_API_AUDIENCE: 'https://knowledge-workbench.plural.ai',
    AUTH0_DOMAIN: 'pluralai.eu.auth0.com',
    API_HOST: 'https://skillcapital-api.plural.ai/',
  },
}

module.exports = {
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    './src/index',
  ],

  mode: 'development',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: process.env.NODE_ENV === 'production' ? 'eval-source-map' : undefined,

  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.worker\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'worker-loader',
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig[process.env.NODE_ENV || 'development']),
    }),
  ],

  optimization: {
    noEmitOnErrors: false,
  },
}
