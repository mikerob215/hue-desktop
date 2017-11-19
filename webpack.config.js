const path = require("path");


module.exports = {
    entry: {
        main: './src/index.ts',
        app: './src/app.ts',
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'ts-loader'
            }
        ]
    },
    target: 'electron'
};