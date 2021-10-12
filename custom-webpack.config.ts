const webpack = require('webpack')

module.exports = { 
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })],
    resolve: { 
        fallback: { 
            "http": require.resolve('stream-http'),
            "https": require.resolve('https-browserify'),
            "buffer": require.resolve('buffer'),
            "process": require.resolve('process/browser')
        } 
    }
}