// Imports
import merge from 'webpack-merge';
import ImageminPlugin from 'imagemin-webpack-plugin';

import common from './webpack.common.babel';

// Webpack Configuration
module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new ImageminPlugin(
            {
                pngquant: {
                    quality: '95-100'
                }
            }
        )
    ],
    mode: 'production'
});
