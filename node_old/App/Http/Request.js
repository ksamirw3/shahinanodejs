var http = require('http');
var mainRequest = function ($opt) {
    var _this = this;
    _this.sendData = null;
    _this.opt = {
        port: $opt.port || 80,
        host: $opt.host || '',
        path: $opt.path || '',
        headers: {},
        method: $opt.method || "Get"
    }
    return {
        set: function (k, val) {
            _this.opt[k] = val;
            return _this;
        },
        setData: function ($data) {
            _this.sendData = require('querystring').stringify($data);
        },
        send: function (succ, err) {
            if (_this.opt.method == "POST")
                _this.opt.headers["Content-Type"] = "application/x-www-form-urlencoded";
            var req = http.request(_this.opt, function (res) {
                var data = "";
                res.on('data', function (d) {
                    data += d
                }).on("end", function () {
                    try {
                        succ(JSON.parse(data));
                    } catch (e) {
                        succ(data)
                    }
                })

            }).on('error', function (e) {
                try {
                    err(e)
                } catch (ee) {
                    console.log("file Http/request " + e.message);
                    console.log("file Http/request " + ee.message);
                }
            });
            if (_this.sendData != null)
                req.write(_this.sendData);
            req.end();
        }
    }
}

exports.request = mainRequest;

exports.get = function (opt, callback, err) {
    var req = mainRequest(opt);
    req.set('method', 'GET');
    req.send(function (e) {
        callback(e)
    }, function (e) {
        err(e)
    })
};

exports.post = function (opt, callback, err) {
    var data = opt.data;
    delete opt.data
    var req = mainRequest(opt);
    req.set("method", "POST")
    req.setData(data);
    req.send(function (e) {
        callback(e)
    }, function (e) {


        err(e)
    })
};

// module.exports = mainRequest;