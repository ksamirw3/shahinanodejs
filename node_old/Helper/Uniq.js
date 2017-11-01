module.exports = {
    get: function () {
        return require("crypto").randomBytes(3 * 4).toString('base64');
    }
}