var server = function (App) {
    return {
        listen: function (port) {
            var expressApp = require('express')();
            require('./App/Http/Routes').serve(expressApp, __dirname);
            var http = require('http');
            var server = http.Server(expressApp).listen(port);
            App.IO = require('socket.io')(server);
            require('./IO/Bootstrape').init(App);
            console.log('server start in port : ' + port);
        }
    }
}

var cons = require('./Helper/Constans').init(__dirname);
var http = require('./App/Http/Request');

var App = {
    path: __dirname,
    rand: require('./Helper/Uniq'),
    calc: require('./Helper/Calc'),
    Log: require('./Helper/Log')(),
    MDB: require('./Helper/Collection'),
    modules: {
        category: require('./Modules/Category').init(cons, http),
        order: require('./Modules/Order').init(cons, http),
        transaction: require('./Modules/Transaction').init(cons, http),
        users: require('./Modules/Users').init(cons, http),
        review: require('./Modules/Review').init(cons, http)
    },
    persons: require('./Helper/Persons'),
    trips: require('./Helper/Trips'),
    session: require('./Helper/Session'),
    cons: cons,
    http: http,
    log: require('./Helper/Log')()
}
server(App).listen(30010);

