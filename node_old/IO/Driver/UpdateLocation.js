exports.init = function (App, socket) {
    var Helper = helper(App);
    socket.on('updateLocation', function (Req) {

        /*
         *
         *
         */

        // App.log.info('update Locaation for token ' + Req.connToken + ' : ' + Req.lat + Req.lng);

        /*
         *
         *
         */

        try {
            var driver = Helper.getDriverDataOrThrowExiption(Req.connToken);

            /*
             *
             *
             */

            Helper.emitDriverLocationToClient(driver, Req);

            /*
             *
             *
             *
             */

            driver.updateData({latitude: Req.lat, longitude: Req.lng});

            /**
             *
             *
             */

            App.IO.emit('liveTracking', {token: Req.connToken, position: {lat: Req.lat, lng: Req.lng}});

        } catch (e) {

            App.log.error(e.message);

        }

    });


}


var helper = function (App) {
    return {

        /*
         *
         *
         *
         */

        getDriverDataOrThrowExiption: function (driverConnection) {
            var driver = App.MDB.get(driverConnection);
            if (driver == undefined)
                throw new Error('Request to update location for undefined token : ' + driverConnection);
            return driver;
        },

        /*
         *
         * @param driverObject
         * @param Req
         */

        emitDriverLocationToClient: function (driverObject, Req) {

            if (driverObject.trip != null) {
                var tripToken = driverObject.trip;
                var clientWithTrip = App.trips.get(tripToken).clientId;
                var client = App.MDB.get(clientWithTrip);
                var clientSocket = client.socketId;
                console.log(JSON.stringify(client))
                console.log(tripToken)

                App.trips.trip(tripToken).addLocationPoint(Req.lat, Req.lng);

                App.trips.addPointToTrip(tripToken, Req.lat, Req.lng);
                if (client.withTrip().getCurrentTrip() == tripToken)
                    App.IO.to(clientSocket).emit('driverUpdateLocation', {lat: Req.lat, lng: Req.lng});
                App.log.info("driver on trip token (" + tripToken + ") and with driver (" + clientSocket + ")");
            }
        }
    }
}