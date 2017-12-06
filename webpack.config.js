const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.ts',
        app: './src/app.tsx',
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            }
        ]
    },
    target: 'electron',
    plugins: [
        new HTMLWebpackPlugin({
            chunks: ['app'],
            template: './src/index.html'
        })
    ],
    node: {
        __dirname: false,
        __filename: false
    },
};