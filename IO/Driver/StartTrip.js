exports.init = function (App, socket) {

    socket.on('startTrip', function (Req) {
        try {
            App.log.error(Req)
            App.IO.to(App.MDB.get(App.trips.get(Req.tripToken).connToken).socketId).emit('tripStarted', Req)
            App.trips.trip(Req.tripToken).startTrip();
        } catch (e) {
            App.log.error(e.message)
        }
    });
}