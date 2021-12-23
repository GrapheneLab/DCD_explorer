const {resolve} = require('path');
const {DefinePlugin} = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const SOURCES = resolve(__dirname, '..', 'src');
const DIST = resolve(__dirname, '..', 'dist');

const config = {

    context: SOURCES,
    target: 'web',

    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', 'whatwg-fetch', './index.js'],
    },

    output: {
        path: DIST,
        filename: '[name][hash].js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js'],
        modules: [
            'node_modules',
            SOURCES,
        ],
    },

    module: {
        rules: [
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: ['json-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /src/,
                use: ['babel-loader'],
            },
            {
                test: /\.svg$/i,
                include: /svg/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        cleanupIDs: false
                                    }
                                ]
                            },
                            jsx: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                exclude: /node_modules/,
                include: /images/,
                use:
                    [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    quality: 75
                                },
                                pngquant: {
                                    quality: "60-70",
                                    speed: 4
                                },
                                svgo: {
                                    plugins: [
                                        {
                                            removeViewBox: false
                                        },
                                        {
                                            removeEmptyAttrs: false
                                        },
                                        {
                                            cleanupIDs: false
                                        }
                                    ]
                                },
                                gifsicle: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                },
                                optipng: {
                                    enabled: false
                                }
                            }
                        }
                    ]
            },
            { test: /\.(woff2?|svg)$/, loader: "url-loader?limit=10000", include: /fonts/, },
            { test: /\.(ttf|eot)$/, loader: "file-loader", include: /fonts/, },
        ],
    },

    plugins: [
        new HtmlPlugin({
            title: 'EOS Explorer',
            template: 'index.html',
            hash: true,
            cache: true
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ],

    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

module.exports = {
    config,
    DIST,
    SOURCES,
};
