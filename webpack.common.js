const path = require('path');
const sassVars = require("./src/App/theme");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [{
          // Creates `style` nodes from JS strings
          loader: 'style-loader',
        },
        // Translates CSS into CommonJS
        { loader: 'css-loader', },
        // Compiles Sass to CSS
        {
          loader: 'sass-loader',
          options: {
            functions: {
              "get($keys)": function (keys) {
                keys = keys.getValue().split(".");
                let result = sassVars;
                let i;
                for (i = 0; i < keys.length; i++) {
                  result = result[keys[i]];
                  if (typeof result === "string") {
                    result = convertStringToSassDimension(result);
                  } else if (typeof result === "object") {
                    Object.keys(result).forEach(function (key) {
                      const value = result[key];
                      result[key] = convertStringToSassDimension(value);
                    });
                  }
                }
                result = sassUtils.castToSass(result);
                return result;
              }
            }
          }
        }],
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};
