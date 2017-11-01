exports.init = function (App, socket) {

    socket.on('currentTrip', function (Req) {

        try {
            var orderId = 'ord' + Req.orderId;
            var $trip = App.trips.get(orderId);
            socket.emit('currentTripDetails', App.trips.get(orderId));
            App.MDB.user($trip.driverToken).myTrips().setCurrent(orderId);
            App.MDB.user($trip.clientId).myTrips().setCurrent(orderId);
        } catch (e) {
            console.log(e)
        }


    })

}




// var helper = function () {
//     return {
//         classifecationData: function (tripObj, Req) {
//             var tripdata = tripObj
//             console.log(tripdata)
//             if (Req.senderType == 'driver') {
//                 delete tripdata.driver;
//                 console.log("client request")
//             } else {
//                 delete tripdata.client;
//                 console.log("driver request")
//             }
//
//             delete tripdata.waitingDrivers;
//             delete tripdata.recevedList;
//
//             return tripdata
//         }
//     }
// }