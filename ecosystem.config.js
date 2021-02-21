// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
const package = require('./package.json')

module.exports = {
    apps: [{
        name               : package.name,
        script             : 'app.js',
        args               : 'one two',
        instances          : 1,
        autorestart        : true,
        watch              : true,
        ignore_watch       : ['node_modules', 'logs', '.git', 'statics'],
        error_file         : 'logs/err.log',
        out_file           : 'logs/out.log',
        log_file           : 'logs/all.log',
        log_date_format    : 'YYYY-MM-DD HH:mm:ss',
        max_memory_restart : '1G',
        env: {
            NODE_ENV       : 'development',
        },
        env_production: {
            NODE_ENV       : 'production',
        }
    }],
    deploy: {
        production: {
            // host          : CONFIG.remote.host,
            // user          : CONFIG.remote.user,
            // path          : CONFIG.remote.path,
            // repo          : CONFIG.git.ssh,
            // ref           : CONFIG.git.ref,
            'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
