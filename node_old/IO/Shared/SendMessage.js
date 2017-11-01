exports.init = function (App, socket) {

    /**
     *
     * chat method
     *
     * it work just a bridge for transfer data from client to driver
     *
     */

    socket.on('sendMessage', function (Req) {

        var $driverToken = '';
        try {
            App.IO.to(App.MDB.get(Req.receiverToken).socketId).emit('messageReceived', {
                message: Req.message,
                messageType: Req.messageType,
                senderToken: Req.receiverToken,
                receiverToken: Req.senderToken
            });


            if (Req.senderType == "driver") {
                $driverToken = Req.senderToken;
            } else {

                $driverToken = Req.receiverToken;
            }

            App.trips.trip(App.MDB.get($driverToken).trip).pushChatObj(Req);

        } catch (e) {
            console.log(e)
        }

    });
}
