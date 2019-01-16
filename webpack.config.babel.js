// Imports
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import multi from 'multi-loader';
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

import paths from './config/paths.config';

// Webpack Configuration
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, paths.cradle.source),
        stats: {
            all: false,
            assets: true,
            builtAt: true,
            errors: true,
            modules: false,
            warnings: true
        },
        watchContentBase: true
    },
    devtool: 'source-map',
    entry: path.resolve(__dirname, paths.webpack.entry),
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: multi(
                        'babel-loader',
                        'eslint-loader'
                    )
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, paths.webpack.output.path),
        filename: paths.webpack.output.filename
    },
    plugins: [
        autoprefixer,
        new CleanWebpackPlugin(
            [
                paths.cradle.destination
            ]
        ),
        new CopyWebpackPlugin(
            [
                {
                    from: paths.cradle.images.src,
                    to: paths.cradle.images.dest
                }
            ]
        ),
        new ImageminPlugin(
            {
                pngquant: {
                    quality: '95-100'
                }
            }
        ),
        new MiniCssExtractPlugin({
            filename: paths.cradle.css.output
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, paths.cradle.source, 'index.html')
        }),
        new StyleLintPlugin({
            syntax: 'scss'
        }),
        new WebpackNotifierPlugin({
            contentImage: '',
            excludeWarnings: false,
            skipFirstNotification: true,
            title: 'Webpack'
        })
    ],
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, paths.cradle.source), 'node_modules']
    },
    stats: {
        all: false,
        assets: true,
        builtAt: true,
        errors: true,
        modules: false,
        warnings: true
    },
    target: 'web'
};
