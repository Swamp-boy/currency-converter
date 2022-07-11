const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './../src'),
    dist: path.join(__dirname, './../dist'),
    assets: 'assets/',
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: ['@babel/polyfill', `${PATHS.src}/index.tsx`],
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: `${PATHS.assets}img/`,
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${PATHS.assets}fonts/`,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),

        new HtmlWebpackPlugin({
            template: `${PATHS.src}/pages/index.html`,
            filename: 'index.html',
        }),
        new ESLintPlugin(),
    ],
};
