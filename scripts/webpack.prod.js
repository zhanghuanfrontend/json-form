const path = require('path')
const entryPath = path.join(process.cwd(), 'src/json_form.js')
const outputPath = path.join(process.cwd(), 'dist')
const inPath = path.join(process.cwd(), 'src')
const webpack = require('webpack')
const uglifyjs = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: entryPath,
    output: {
        library: "form",
        libraryTarget: "umd",
        path: outputPath,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                include: inPath,
                use: ["babel-loader?cacheDirectory=true"]
            },
            {
                test: /\.less$/,
                include: inPath,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        new uglifyjs(),
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'prop-types',
        'async-validator': 'async-validator',
    },
    devtool: 'inline-source-map'
}