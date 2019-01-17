// Imports
import merge from 'webpack-merge';
import path from 'path';

import common from './webpack.common.babel';
import paths from './webpack.paths';

// Webpack Configuration
module.exports = merge(common, {
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
    mode: 'development'
});
