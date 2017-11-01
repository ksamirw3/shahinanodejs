exports.init = function (App, socket) {

    socket.on('selectSuggestedPrice', function (Req) {
        try {

            /*
             * emit accepted to driver
             */

            App.IO.to(App.MDB.get(Req.driverConnToken).socketId).emit('suggestionAccepted');


            var trip = App.trips.get(Req.orderId);
            var curentDriverSocketId = App.MDB.get(Req.driverConnToken).socketId;


            if (trip.waitingDrivers != undefined) {
                var wittingList = trip.waitingDrivers;
                for (var wit in wittingList) {
                    var driverSocket = App.MDB.get(wittingList[wit].driverToken).socketId;

                    if (curentDriverSocketId != driverSocket)
                        App.IO.to(driverSocket).emit('anotherDriverSelected');
                }
            }


            if (trip.recevedList != undefined) {
                var receiverList = trip.recevedList;
                for (var dri in receiverList) {

                    if (curentDriverSocketId != receiverList[dri])
                        App.IO.to(receiverList[dri]).emit('anotherDriverSelected');
                }
            }


            /*
             * add driver to trip on data base
             */

            App.modules.order.assainDriverTotrip(Req.orderId, Req.driverConnToken);

            /*
             * add trip to driver object in MDB
             */

            App.MDB.user(Req.driverConnToken).assignToTrip(Req.orderId);

            /*
             * set this trip is current trip
             */

            App.MDB.user(Req.connToken).myTrips().setCurrent(Req.orderId)

            /*
             * add driver to trip object
             */
            App.trips.assainDriver(Req.orderId, Req.driverConnToken);

            App.trips.trip(Req.orderId).assainDriverObj(App.MDB.get(Req.driverConnToken));

            App.MDB.user(Req.connToken).assignToTrip(Req.orderId);

        } catch (e) {
            console.log(e)
        }
    });

}