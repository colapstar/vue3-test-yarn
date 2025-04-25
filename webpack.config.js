// webpack.config.js
import path from 'path';
import { fileURLToPath, createRequire } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';

const require = createRequire(import.meta.url); // ✅ Import JSON safely in ESM
const { dependencies } = require('./package.json'); // ✅ Get dependencies

const { ModuleFederationPlugin } = webpack.container;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',

  entry: './src/main.js',

  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  optimization: {
    runtimeChunk: false, // ✅ Fix shared eager module errors
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: '@vue/runtime-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: './index.html', // ✅ Use your custom HTML
    }),

    new ModuleFederationPlugin({
      name: 'vue_host',
      filename: 'remoteEntry.js',
      remotes: {
        angular_remote: 'angular_remote@http://localhost:4201/remoteEntry.js',
      },
      shared: {
        ...dependencies,
        vue: {
          singleton: true,
          strictVersion: false,
          requiredVersion: dependencies.vue,
        },
      },
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
