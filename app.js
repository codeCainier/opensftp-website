const Koa        = require('koa')
const bodyparser = require('koa-bodyparser')()
const static     = require('koa-static')
const cors       = require('./cors')
const template   = require('./middlewares/template')
const route      = require('./middlewares/route')
const api        = require('./middlewares/api')
const listen     = require('./middlewares/listen')
const production = process.env.NODE_ENV === 'production'

const app        = new Koa()

app
    .use(static('./'))
    .use(template('views', {
        noCache: !production,
        watch  : !production
    }))
    .use(bodyparser)
    .use(cors)
    .use(route)
    .use(api)

listen(app)