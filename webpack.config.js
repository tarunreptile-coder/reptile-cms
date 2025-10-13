/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const configuration = require('./appSettings.json');

function getPlugins(environmentVariable, environmentConfigurationType) {
  var plugins = [];
  var patterns = [
    { from: './public/img', to: 'img' },
    { from: './public/assets', to: 'assets' },
    { from: './public/favicon.ico', to: './' },
    { from: './public/version.json', to: './' },
  ];

  if (environmentVariable === 'prod' || environmentVariable === 'prod-full') {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        debug: true,
      })
    );
    plugins.push(
      new CopyWebpackPlugin(
        {
          patterns: patterns,
        },
        {
          copyUnmodified: false,
        }
      )
    );
  }

  if (
    environmentVariable === 'stg-full' ||
    environmentVariable === 'prod-full'
  ) {
    // patterns.push(
    // 	{ from: '../trunk/src/DigitalPcWeb/bin', to: './../bin' }
    // );
    plugins.push(
      new CopyWebpackPlugin(
        {
          patterns: patterns,
        },
        {
          copyUnmodified: false,
        }
      )
    );
  }

  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].styles.css',
    })
  );
  plugins.push(
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: './public/index.html',
      filename: './../index.html',
    })
  );

  plugins.push(
    new webpack.DefinePlugin({
      envConfiguration: JSON.stringify(
        configuration[environmentConfigurationType]
          ? configuration[environmentConfigurationType]
          : configuration['prod']
      ),
    })
  );
  plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return plugins;
}

module.exports = (env) => {
  // eslint-disable-next-line no-unused-vars
  let webPackEnvironmentVariables = env;
  let BUILD_DIR = '';
  let environmentVariable = process.env.NODE_ENV;
  let environmentConfigurationType = '';

  if (environmentVariable.includes('prod')) {
    environmentConfigurationType = 'prod';
    BUILD_DIR = path.resolve(__dirname, '../Deployment/Live/build');
  } else if (environmentVariable.includes('stg')) {
    environmentConfigurationType = 'stg';
    BUILD_DIR = path.resolve(__dirname, '../Deployment/Dev/build');
  } else {
    environmentConfigurationType = 'dev';
    BUILD_DIR = path.resolve(__dirname, './build');
  }

  const api = configuration[environmentConfigurationType].digitalPcServiceUrl;

  return {
    watch: false,
    stats: 'minimal',
    devtool:
      environmentConfigurationType === 'prod' ? false : 'eval-source-map',
    entry: './src/index',
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      publicPath: '/build/',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        '@Reptile/Assets': path.resolve(__dirname, 'src/Assets'),
        '@Reptile/Components': path.resolve(__dirname, 'src/Components'),
        '@Reptile/Constants': path.resolve(__dirname, 'src/Constants'),
        '@Reptile/Contexts': path.resolve(__dirname, 'src/Contexts'),
        '@Reptile/Framework': path.resolve(__dirname, 'src/Framework'),
        '@Reptile/Hooks': path.resolve(__dirname, 'src/Hooks'),
        '@Reptile/Services': path.resolve(__dirname, 'src/Services'),
        '@Reptile/Store': path.resolve(__dirname, 'src/Store'),
        //'cldr$': 'cldrjs', 'cldr': 'cldrjs/dist/cldr'
      },
      fallback: {
        fs: false,
        path: false,
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    performance: {
      hints: false,
    },
    devServer: {
      proxy: {
        '/api': {
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          target: api,
          onProxyReq: (proxyReq) => {
            // Browers may send Origin headers even with same-origin
            // requests. To prevent CORS issues, we have to change
            // the Origin to match the target URL.
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', api);
            }
          },
        },
        '/Datastore': {
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          target: api,
          onProxyReq: (proxyReq) => {
            // Browers may send Origin headers even with same-origin
            // requests. To prevent CORS issues, we have to change
            // the Origin to match the target URL.
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', api);
            }
          },
        },
        // "*": "http://localhost:55502",
        // "secure": false,
        // "changeOrigin": true
      },
      contentBase: __dirname,
      port: 9001,
      compress: true,
      hot: true,
      open: true,
      writeToDisk: true,
      historyApiFallback: true,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, './src'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './scss/reptile/variables.scss',
                  './scss/reptile/mixins.scss',
                ],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: './img/[name].[ext]',
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          generator: {
            filename: './fonts/[name].[hash].[ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          resourceQuery: { not: [/component/, /icon/] }, // Load as file if imported as .svg
        },
        {
          test: /\.svg$/i,
          resourceQuery: /icon/, // Load as icon if imported as .svg?icon
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                replaceAttrValues: {
                  '#101828': 'currentColor',
                },
                svgProps: { className: 'rt-icon' },
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          resourceQuery: /component/, // Load as react component if imported as .svg?component
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                dimensions: false,
              },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(environmentVariable, environmentConfigurationType),
  };
};
