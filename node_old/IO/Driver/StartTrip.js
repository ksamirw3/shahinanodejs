exports.init = function (App, socket) {

    socket.on('startTrip', function (Req) {
        try {
            App.log.error(Req)
            App.IO.to(App.MDB.get(App.trips.get(Req.orderId).connToken).socketId).emit('tripStarted', Req)
            App.trips.trip(Req.orderId).startTrip();
        } catch (e) {
            App.log.error(e.message)
        }
    });
}