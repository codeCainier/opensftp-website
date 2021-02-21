function clone (obj) {
    return extend(true, {}, obj);
}

function formatDate(timestamp, format) {
    if (String(timestamp).length === 10) timestamp *= 1000;
    const time = new Date(timestamp);
    const yyyy = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const H = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    const rule = [
        { key: 'yyyy', val: yyyy },
        { key: 'yy',   val: String(yyyy).substring(2) },
        { key: 'MM',   val: add0(M) },
        { key: 'M',    val: M},
        { key: 'dd',   val: add0(d) },
        { key: 'd',    val: d},
        { key: 'HH',   val: add0(H) },
        { key: 'H',    val: H },
        { key: 'mm',   val: add0(m) },
        { key: 'm',    val: m },
        { key: 'ss',   val: add0(s) },
        { key: 's',    val: s },
    ];

    rule.forEach((item) => format = format.replace(new RegExp(item.key, 'g'), item.val));

    return format;
}

function add0(str) {
    return Number(str) < 10 ? `0${str}` : str;
}

function getUrlParams(url) {
    url = decodeURI(url);
    const dataObj = {};
    url = url.substring(url.indexOf('?') + 1, url.length);
    if (url.indexOf('&') > -1) {
        url = url.split('&');
        for (let i = 0; i < url.length; i += 1) {
            let arr = url[i].split('=');
            dataObj[arr[0]] = arr[1];
        }
    } else {
        url = url.split('=');
        dataObj[url[0]] = url[1];
    }
    return dataObj;
}

function getPagination (ctx) {
    let { page, size } = getUrlParams(ctx.request.url);
    page = Number(page);
    size = Number(size);
    return { 
        from : (page - 1) * size,
        size : size,
    }
}

function extend() {
    let
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        class2type = {}

    'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(name => {
        class2type['[object ' + name + ']'] = name.toLowerCase()
    })

    function type (obj) {
        return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object'
    }

    function isPlainObject (obj) {
        if (!obj || type(obj) !== 'object') {
            return false
        }

        if (obj.constructor &&
                !hasOwn.call(obj, 'constructor') &&
                !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false
        }

        let key
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key)
    }

    let
            options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false

    if (typeof target === 'boolean') {
        deep = target
        target = arguments[1] || {}
        i = 2
    }

    if (Object(target) !== target && type(target) !== 'function') {
        target = {}
    }

    if (length === i) {
        target = this
        i--
    }

    for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
            for (name in options) {
                src = target[name]
                copy = options[name]

                if (target === copy) {
                    continue
                }

                if (deep && copy && (isPlainObject(copy) || (copyIsArray = type(copy) === 'array'))) {
                    if (copyIsArray) {
                        copyIsArray = false
                        clone = src && type(src) === 'array' ? src : []
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {}
                    }

                    target[name] = extend(deep, clone, copy)
                }
                else if (copy !== undefined) {
                    target[name] = copy
                }
            }
        }
    }

    return target
}

String.prototype.cutStart = function (num) {
    return this.substring(num, this.length)
}

String.prototype.cutEnd = function (num) {
    return this.substring(0, this.length -num)
}

module.exports = {
    formatDate,
    add0,
    getUrlParams,
    getPagination,
    clone,
}