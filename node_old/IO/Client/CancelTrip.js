exports.init = function (App, socket) {

    socket.on('cancelTrip', function (Req) {
     try{

         App.MDB.user(Req.driverToken).removeTrip();
         App.IO.to(App.MDB.get(Req.driverToken).socketId).emit('clientCancelTrip');
         App.modules.order.setTripStatus(Req.orderId).cancel();
     }catch (e){
         console.log(e)
     }
    })


}