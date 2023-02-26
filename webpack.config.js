const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
   devServer: {
      open: true,
      watchFiles: ['src/**/*', 'public/**/*'],
      port: 8080,
      historyApiFallback: true,
      static: path.join(__dirname, './src/public'),
   },
};

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })];

module.exports = ({ development }) => ({
   mode: development ? 'development' : 'production',
   devtool: development ? 'source-map' : false,
   optimization: {
      minimize: false
   },
   performance: {
      hints: false
   },
   entry: {
      app: './src/index.ts',
   },
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext]',
      publicPath: '/'
   },
   module: {
      rules: [
         {
            test: /\.[tj]s$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(?:ico|gif|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.png/,
            type: 'asset/resource',
         },
         {
            test: /\.(woff(2)?|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(json)$/i,
            type: 'json',
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         }
      ],
   },
   plugins: [
      ...esLintPlugin(development),
      new HtmlWebpackPlugin({
         template: './src/index.html',
         favicon: "./src/public/favicon.svg"
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new CopyPlugin({
         patterns: [{
            from: './src/public',
            noErrorOnMissing: true,
         }],
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
   ],
   resolve: {
      extensions: ['.ts', '.js'],
   },
   ...devServer(development),
});
