class Response {
    constructor (ctx) {
        this.ctx = ctx
        this.res = {
            code    : null,
            data    : null,
            message : null,
        }
    }

    setData(data) {
        this.res.data = data;
    }

    success(message = '操作成功') {
        this.#send(200, message)
    }

    error(message = '操作失败') {
        this.#send(400, message)
    }

    #send = (code, message) => {
        this.res.code    = code
        this.res.message = message
        this.ctx.body    = this.res
    }
}

module.exports = Response;