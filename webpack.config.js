const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Plugin to create .nojekyll file for GitHub Pages
class NoJekyllPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('NoJekyllPlugin', (compilation) => {
      const nojekyllPath = path.join(compilation.options.output.path, '.nojekyll');
      fs.writeFileSync(nojekyllPath, '');
    });
  }
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(mp3|ogg|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[name].[hash][ext]'
        }
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MindMesh - Puzzle Game',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      }
    }),
    new NoJekyllPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
