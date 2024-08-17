import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function(app) {
    app.use(
        '/nvapi',
        createProxyMiddleware( {
            target: 'https://naveropenapi.apigw.ntruss.com',
            changeOrigin: true,
            pathRewrite: {
                '^/nvapi': ''
            }
        })
    )
}