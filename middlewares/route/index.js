const router = require('koa-router')()

router.get('/', async ctx => {
    ctx.render('index.html')
})

module.exports = (() => router.routes())()