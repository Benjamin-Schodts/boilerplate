module.exports = {
    cradle: {
        images: {
            src: './src/img/',
            dest: 'img/'
        },
        css: {
            entry: './src/scss/style.scss',
            output: 'css/styles.css',
            watch: './src/scss/**/*.scss'
        },
        destination: 'dist/',
        source: 'src/',
        stylelint: './src/scss/**/*.scss'
    },
    webpack: {
        entry: './src/js/app.js',
        output: {
            path: 'dist',
            filename: 'js/scripts.js'
        }
    }
};
