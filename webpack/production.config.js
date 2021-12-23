const merge = require('webpack-merge')
const {optimize} = require('webpack')
const webpack = require('webpack')
const UglifyJs = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {resolve} = require('path');

const SOURCES = resolve(__dirname, '..', 'src')
const DIST = resolve(__dirname, '..', 'dist');

const {config} = require('./common')
const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
})

module.exports = merge(config, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                    fallback: 'style-loader',
                }),
            },
        ],
    },

    cache: false,
    watch: false,
    profile: true,

    plugins: [
        new UglifyJs({uglifyOptions: {compress: {warnings: false}}}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CopyWebpackPlugin([{ context: SOURCES, from: 'assets', to: DIST }]),
        new optimize.ModuleConcatenationPlugin(),
        extractSass,
    ],
})
