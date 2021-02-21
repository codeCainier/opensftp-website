module.exports = require('koa2-cors')({
    origin: (ctx) => '*',
    maxAge       : 5,
    credentials  : true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    allowHeaders : ['Content-Type', 'Authorization', 'Accept', 'Token', 'User-Time'],
    allowMethods : ['GET', 'PUT', 'DELETE', 'POST'],
});