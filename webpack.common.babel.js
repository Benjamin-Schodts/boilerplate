// Imports
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import multi from 'multi-loader';
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

import paths from './webpack.paths';

// Webpack Configuration
module.exports = {
    entry: path.resolve(__dirname, paths.webpack.entry),
    module: {
        rules: [
            {
                test: /\.js$/,
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
                    'style-loader',
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
                path.join(__dirname, paths.cradle.destination)
            ]
        ),
        new CopyWebpackPlugin(
            [
                {
                    from: path.join(__dirname, paths.cradle.images.src),
                    to: path.join(__dirname, paths.cradle.images.dest)
                }
            ]
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
        extensions: ['.js', '.scss'],
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
