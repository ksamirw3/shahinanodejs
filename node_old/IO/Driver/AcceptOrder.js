module.exports.init = function (App, socket) {
    var Helper = helper(App);
    socket.on('acceptOrder', function (Req) {
        try {
            var trip = App.trips.get(Req.orderId);

            if (trip == undefined) {
                socket.emit("orderAlreadyAccepted")
                return;
            }


            App.log.info('accept order start');
            App.log.info("client request : " + App.MDB.get(Req.connToken).socketId)

            Helper.assainDriverToTripInDatabase(Req.orderId, Req.connToken);


            var driver = App.MDB.get(Req.connToken);
            var curentDriverSocketId = driver.socketId;


            if (App.trips.trip(Req.orderId).hasDriver()) {
                socket.emit('orderAlreadyAccepted');
                return;
            }


            App.trips.assainDriver(Req.orderId, Req.connToken);

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

            App.session.clear(Req.orderId);

            var clientId = App.trips.get(Req.orderId).clientId;

            var clientSocket = App.MDB.get(clientId).socketId;

            Helper.emitOrderAcceptedtoDriver(driver, clientSocket, Req);


            App.MDB.user(Req.connToken).assignToTrip(Req.orderId);

            App.MDB.user(clientId).assignToTrip(Req.orderId);


            App.MDB.user(clientId).myTrips().setCurrent(Req.orderId);

            App.trips.trip(Req.orderId).assainDriverObj(App.MDB.get(Req.connToken));


        } catch (e) {
            App.log.error(e.message);
        }
    })
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
            App.IO.to(clientSocket).emit('orderAccepted', {
                driverToken: Req.connToken,
                orderId: Req.orderId,
                info: App.modules.users.makeDriverData(driver.data)
            });
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
            App.modules.order.assainDriverTotrip(orderId, driverToken, function (res) {
                console.log("order " + orderId + " update with : " + driverToken);
            })
        }
    }
}