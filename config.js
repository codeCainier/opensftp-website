const CONFIG = {
    server: {
        domain: 'products.srun.com',
        host: '0.0.0.0',
        port: '443',
    },
    coding: {
        username: 'xr@srun.com',
        password: 'codeMaster.95',
        apiKey: '200aa7eb88d234870cbfefafac143c83023d04e8',
    }
}

if (process.env.NODE_ENV === 'development') {
    CONFIG.server.port = '80'
}

module.exports = CONFIG