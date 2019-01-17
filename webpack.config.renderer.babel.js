import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
    ...baseConfig,
    entry: {
        renderer: ['react-hot-loader/patch', path.join(__dirname, process.env.NODE_ENV === 'production' ? 'src/renderer' : 'src/renderer.dev')]
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: baseConfig.output.path,
        publicPath: baseConfig.output.publicPath,
        historyApiFallback: true,
        hotOnly: true
    },
    ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
              plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
          }),
    target: 'electron-renderer'
};
