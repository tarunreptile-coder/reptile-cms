/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // ✅ NEW

const configuration = require('./appSettings.json');

function getPlugins(environmentVariable, environmentConfigurationType) {
  const plugins = [];
  const patterns = [
    { from: './public/img', to: 'img' },
    { from: './public/assets', to: 'assets' },
    { from: './public/favicon.ico', to: './' },
    { from: './public/version.json', to: './' },
  ];

  if (environmentVariable === 'prod' || environmentVariable === 'prod-full') {
    plugins.push(
      new webpack.LoaderOptionsPlugin({ debug: true })
    );
    plugins.push(
      new CopyWebpackPlugin({ patterns }, { copyUnmodified: false })
    );
  }

  if (environmentVariable === 'stg-full' || environmentVariable === 'prod-full') {
    plugins.push(
      new CopyWebpackPlugin({ patterns }, { copyUnmodified: false })
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
        configuration[environmentConfigurationType] || configuration['prod']
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
  const environmentVariable = process.env.NODE_ENV || 'development';
  let BUILD_DIR = '';
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
    devtool: environmentConfigurationType === 'prod' ? false : 'eval-source-map',
    entry: './src/index',
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      // CRITICAL FIX: Base path is the root
      publicPath: '/', 
    },
    resolve: {
      // ✅ Let Webpack read aliases directly from tsconfig.json
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json'),
        }),
      ],
      alias: {
        // You can keep a few explicit aliases if you want (not required)
        '~': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        fs: false,
        path: false,
      },
    },
    performance: { hints: false },
    devServer: {
      proxy: {
        '/api': {
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          target: api,
          onProxyReq: (proxyReq) => {
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
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', api);
            }
          },
        },
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
              options: { esModule: false },
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
          // ⭐️ MODIFIED: Removed leading './' to ensure it respects publicPath
          generator: { filename: 'img/[name].[ext]' },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          // ⭐️ MODIFIED: Removed leading './' to ensure it respects publicPath
          generator: { filename: 'fonts/[name].[hash].[ext]' },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          resourceQuery: { not: [/component/, /icon/] },
          // ⭐️ ADDED: Explicitly set filename for non-component SVG assets
          generator: { filename: 'svg/[name].[ext]' },
        },
        {
          test: /\.svg$/i,
          resourceQuery: /icon/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                replaceAttrValues: { '#101828': 'currentColor' },
                svgProps: { className: 'rt-icon' },
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          resourceQuery: /component/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: { dimensions: false },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(environmentVariable, environmentConfigurationType),
  };
};
