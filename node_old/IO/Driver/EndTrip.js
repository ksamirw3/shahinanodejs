exports.init = function (App, socket) {

    socket.on('endTrip', function (Req) {
        try {

            /*
             *
             */

            var clientId = App.trips.get(Req.orderId).connToken;

            /*
             *
             */

            var clientSocketId = App.MDB.get(clientId).socketId;

            /*
             *
             */

            App.IO.to(clientSocketId).emit('tripEnded', Req)

            /*
             *
             */

            App.modules.order.setTripStatus(Req.orderId).executed();

            /*
             *
             */

            App.modules.transaction.addTransactionForTrip(Req.orderId);

            /*
             *
             */

            App.MDB.user(Req.connToken).removeTrip();

            /*
             *
             *
             */

            App.modules.transaction.getDriverInvoicByOrderId(Req.orderId, function (res) {
                socket.emit('getDriverInvoice', res.data);
            })
        } catch (e) {
            App.log.error(e.message)
        }
    });
}