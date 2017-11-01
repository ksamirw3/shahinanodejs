var list = [];
module.exports = {
    add: function ($token, time, callback) {
        list[$token] = setTimeout(function () {
            callback();
            clearTimeout(list[$token]);
        }, time * 1000);
    },
    get: function ($token) {
        return list[$token];
    },
    clear: function ($token) {
        clearTimeout(list[$token]);
        delete  list[$token];
    }
}