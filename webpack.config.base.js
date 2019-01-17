import fs from 'fs';
import path from 'path';

const getBabelLoader = () => {
    const baseOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'));
    const options = {
        ...baseOptions,
        presets: baseOptions.presets.map(preset => (preset === '@babel/env' ? ['@babel/env', { modules: false }] : preset)),
        babelrc: false
    };

    return {
        loader: 'babel-loader',
        options
    };
};

export default {
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: getBabelLoader()
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    name: "[path][name].[ext]",
                }
            },
            {
                test: /\.(postcss|css)?$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, 'postcss-loader']
            }
        ]
    }
};
