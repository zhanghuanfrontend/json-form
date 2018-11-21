const path = require('path')
const entryPath = path.join(process.cwd(), 'src/json_form.js')
const outputPath = path.join(process.cwd(), 'dist')
const inPath = path.join(process.cwd(), 'src')
const uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: entryPath,
    output: {
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
        // 压缩输出的 JS 代码
        // new UglifyJSPlugin({
        //     compress: {
        //         // 在UglifyJs删除没有用到的代码时不输出警告
        //         warnings: false,
        //         // 删除所有的 `console` 语句，可以兼容ie浏览器
        //         drop_console: true,
        //         // 内嵌定义了但是只用到一次的变量
        //         collapse_vars: true,
        //         // 提取出出现多次但是没有定义成变量去引用的静态值
        //         reduce_vars: true,
        //     },
        //     output: {
        //         // 最紧凑的输出
        //         beautify: false,
        //         // 删除所有的注释
        //         comments: false,
        //     }
        // }),
        new uglifyjs()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    externals: [
        'react',
        'react-dom',
        'prop-types',
        'async-validator',
        'antd'
    ],
    devtool: 'inline-source-map'
}