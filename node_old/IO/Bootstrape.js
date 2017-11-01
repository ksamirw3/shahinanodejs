exports.init = function (App) {
    App.IO.on('connection', function (socket) {

        /**
         * log every time when new connection stables
         */

        console.log('new connection with socket id : ' + socket.id);

        /**
         *
         * shared controller with all method of client
         *
         */

        require('./SharedController').init(App, socket);

        /**
         *
         * client controller with all method of client
         *
         */

        require('./ClientController').init(App, socket);

        /**
         *
         * driver controller with all method of client
         *
         */

        require('./DriverController').init(App, socket);
    })
}