import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import { isDev } from './src/constants/AppConstants';

export default {
    ...baseConfig,
    entry: {
        renderer: ['react-hot-loader/patch', path.join(__dirname, isDev ? 'src/renderer.dev' : 'src/renderer')]
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: baseConfig.output.path,
        publicPath: baseConfig.output.publicPath,
        historyApiFallback: true,
        host: 'localhost',
        port: 32321,
        hotOnly: true
    },
    ...(isDev
        ? {
              plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
          }
        : {}),
    target: 'electron-renderer'
};
