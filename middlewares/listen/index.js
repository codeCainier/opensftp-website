const fs         = require('fs')
const path       = require('path')
const sslify     = require('koa-sslify').default
const https      = require('https')
const CONFIG     = require('../../config')
const production = process.env.NODE_ENV === 'production'

const { host, port } = CONFIG.server

function useHttp (app) {
    app.listen(port, host)

    console.info(`[Development]: Run HTTP on ${host}:${port}`)
};

function useHttps (app) {
    const option = {
        key : fs.readFileSync(path.join(__dirname, '../../ssl/cert.key')),
        cert: fs.readFileSync(path.join(__dirname, '../../ssl/cert.pem')),
    }

    https
        .createServer(option, app.callback())
        .listen(port, err => err ? console.error(err) : '')

    app.use(sslify())
    
    console.info(`[Production]: Run HTTPS on ${host}:${port}`)
}

module.exports = app => production ? useHttps(app) : useHttp(app)