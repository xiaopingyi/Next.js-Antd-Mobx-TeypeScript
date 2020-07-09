/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess({
    // lessloader
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, {isServer}) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }
        config.module.rules.push({
            test: /\.(png|jpg|gif|bmp|jpeg|mp4|svg|ttf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 1024,
                        name: 'static/media/[name].[hash:8].[ext]',
                        publicPath: '/_next/',
                    },
                },
            ],
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.join(__dirname, './'),
        }
        return config
    },
})
