module.exports.init = function (App, socket) {
    var Helper = helper(App);
    socket.on('acceptOrder', function (Req) {
        try {
            var trip = App.trips.get(Req.tripToken);
            
//            let alltrip = App.trips.all();
            
            console.log("trip >>", trip);

            console.log("tripDetails   from acceptOrder", Req, trip);
            
            if (trip == undefined) {
                console.log("trip orderAlreadyAccepted..");
                socket.emit("orderAlreadyAccepted");
                return;
            }


            App.log.info('accept order start');
            App.log.info("client request : " + App.MDB.get(Req.connToken).socketId);

            console.log("strt ======> saving driver to order is done");
            Helper.assainDriverToTripInDatabase(Req.orderId, Req.connToken);
            console.log("END ======> saving driver to order is done");

            var driver = App.MDB.get(Req.connToken);
            var curentDriverSocketId = driver.socketId;


            console.log("strt =====> check that trip has driver or not ");
            if (App.trips.trip(Req.tripToken).hasDriver()) {
                socket.emit('orderAlreadyAccepted');
                return;
            }
            console.log("END =====> check that trip has driver or not ");


            console.log("strt =====> set driver to trip ");
            App.trips.assainDriver(Req.tripToken, Req.connToken);
            console.log("END =====> set driver to trip  ");

            /*
             *
             * emit message cancel tip for recivers drivers
             */

            Helper.cancelTripForReciverDrivers(trip.recevedList, curentDriverSocketId);

            /*
             *
             * cancel trip for waiiting list
             */

            Helper.cancelTripForWaitingList(trip.waitingDrivers, curentDriverSocketId);

            /*
             *clear timer for trip
             */

            App.session.clear(Req.tripToken);

            var clientId = App.trips.get(Req.tripToken).clientId;

            var clientSocket = App.MDB.get(clientId).socketId;

            Helper.emitOrderAcceptedtoDriver(driver, clientSocket, Req);


            App.MDB.user(Req.connToken).assignToTrip(Req.tripToken);

            App.MDB.user(clientId).assignToTrip(Req.tripToken);


            App.MDB.user(clientId).myTrips().setCurrent(Req.tripToken);

            App.trips.trip(Req.tripToken).assainDriverObj(App.MDB.get(Req.connToken));


        } catch (e) {
            App.log.error(e.message);
        }
    });

    socket.on('getDriversTrips', function (Req) {
        try {
            var drivers = App.MDB.allDrivers();

            socket.emit('driversWithTrips', {
                drivers: drivers
            });
            console.log('getDriversTrips', drivers);
        } catch (e) {
            App.log.error(e.message);
        }
    });


}

var helper = function (App) {
    var _this = this;


    return {

        /**
         *
         * @param clientSocket
         * @param Req
         */

        emitOrderAcceptedtoDriver: function (driver, clientSocket, Req) {
            console.log("emit to client", driver);
            console.log("emit to client", clientSocket, Req);
            App.IO.to(clientSocket).emit('orderAccepted', {
                driverToken: Req.connToken,
                orderId: Req.orderId,
                tripToken: Req.tripToken,
                info: App.modules.users.makeDriverData(driver.data)
            });
            console.log("DONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNE");
        },

        /**
         *
         * @param receiverList
         * @param curentDriverSocketId
         */

        cancelTripForWaitingList: function (wittingList, curentDriverSocketId) {
            for (var wit in wittingList) {
                var driverSocket = App.MDB.get(wittingList[wit].driverToken).socketId;
                if (curentDriverSocketId != driverSocket)
                    App.IO.to(driverSocket).emit('orderAlreadyAccepted');
            }
        },

        /**
         *
         * @param receiverList
         * @param curentDriverSocketId
         */

        cancelTripForReciverDrivers: function (receiverList, curentDriverSocketId) {
            for (var dri in receiverList) {
                if (curentDriverSocketId != receiverList[dri])
                    App.IO.to(receiverList[dri]).emit('orderAlreadyAccepted');
            }
        },

        /**
         *
         * @param orderId
         * @param driverToken
         */

        assainDriverToTripInDatabase: function (orderId, driverToken) {
            console.log('assainDriverToTripInDatabase:>>> ', orderId, driverToken);
            App.modules.order.assainDriverTotrip(orderId, driverToken, function (res) {
                console.log("order " + orderId + " update with : " + driverToken);
            })
        }
    }
}