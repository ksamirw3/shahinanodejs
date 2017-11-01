exports.init = function (App) {
    App.IO.of("live").on('connection', function (socket) {
        console.log("live")

        socket.on("fetchDrivers", function (d, e) {
            var drivers = App.MDB.allDrivers();
            var list = [];
            for (var i in drivers) {
                list.push({
                    "id": i,
                    "lat": drivers[i].data.latitude,
                    "lng": drivers[i].data.longitude,
                })
            }
            e({list: list})
        })


    })

    App.IO.on('connection', function (socket) {
        console.log("glopal")
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