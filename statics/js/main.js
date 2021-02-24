String.prototype.cutStart = function (num) {
    return this.substring(num, this.length)
}

new Vue({
    el: '#app-opensftp',
    delimiters: ['${', '}'],
    data() {
        return {
            splitterModel: 45,
            showPwd: false,
            host: '',
            port: '22',
            username: 'root',
            password: '',
            dark: false,
            list: [
                { name: '本地开发服务器', host: '192.168.0.100' },
                { name: '本地测试服务器', host: '192.168.0.101' },
                { name: '家用网关', host: '192.168.0.1' },
                { name: 'Open SFTP', host: 'opensftp.com' },
            ],
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    created() {
    },
})