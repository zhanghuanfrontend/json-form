const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const entryPath = path.join(process.cwd(), 'src/index.js')
const outputPath = path.join(process.cwd(), 'build')
const inPath = path.join(process.cwd(), 'src')

module.exports = {
    entry: entryPath,
    output: {
        path: outputPath,
        filename: '[name].bundle.js'
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
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
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.join(__dirname, '../template/index.html')
        // })
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    devServer: {
        contentBase: path.join(__dirname, '../build'),
        historyApiFallback: true,
    },
    devtool: 'inline-source-map'
}