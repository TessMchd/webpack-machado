const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("imagemin-webpack-plugin").default;
const ImageMinMozjpeg = require('imagemin-mozjpeg')

let config = {
    entry: "./src/index.js",
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext]"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.ProvidePlugin({
            $: 'bootstrap',
            Bootstrap: 'bootstrap'
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/img/", to: "images/" }
            ],
        }),
        new ImageMinimizerPlugin({
            pngquant: {
                quality: '50-70'
            },
            plugins: [
                ImageMinMozjpeg({
                    quality: 50,
                    progressive: true
                })
            ]
        })
    ],
    devServer: {
        static :'./dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
module.exports = config;