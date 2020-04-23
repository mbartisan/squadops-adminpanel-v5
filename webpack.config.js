const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: `[name].[hash].js`
    },
    devServer: {
        disableHostCheck: true,
        inline: true,
        port: 4201,
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] }) },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/, loader: 'file' }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            base: "/",
            hash: true
        }),

        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/index.html',
            filename: 'index.html'
        }),

        new ExtractTextPlugin('styles.css')
    ]
};
