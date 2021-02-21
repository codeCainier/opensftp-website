const fs       = require('fs')
const path     = require('path')
const router   = require('koa-router')()
const tools    = require('../../utils')
const Response = require('../response')

const apiPath = path.join(__dirname, '../../api')

function registeApi (dir) {
    // 遍历目录下所有文件
    fs.readdirSync(dir).forEach(fileName => {
        // 文件完整路径
        const filePath = path.join(dir, fileName)

        // 若该文件为目录，则继续遍历该目录下所有文件
        if (fs.statSync(filePath).isDirectory()) return registeApi(filePath)
        // 忽略入口文件
        // if (filePath.endsWith('index.js'))       return
        // 忽略非 js 文件
        if (!filePath.endsWith('.js'))           return console.info('非 JS 文件不要放在 api 目录下' + filePath)

        regist(filePath);
    })
}

function regist(filePath) {
    // API
    const api     = require(filePath)
    // API 名称
    const apiName = getApiName(filePath)

    // 遍历请求方式
    for (const type of Object.keys(api)) {
        // 响应操作
        router[type](apiName, async (ctx) => {
            await api[type](getRequest(ctx), new Response(ctx))
        })
        // 打印接口信息
        apiLog(type, apiName)
    }
}

function getApiName(filePath) {
    return filePath.cutEnd(3)
        .replace(apiPath, '')
        .replace(/\\/g, '/')
}

function getRequest(ctx) {
    return {
        params : { ...ctx.request.body, ...tools.getUrlParams(ctx.request.url) },
        page   : tools.getPagination(ctx),
        ctx,
    }
}

function apiLog (type, apiName, apiIntro = '') {
    console.info(`${apiIntro}\n[${type.toUpperCase()}]: ${apiName}\n****************************************`)
}

registeApi(apiPath)

module.exports = (() => router.routes())()