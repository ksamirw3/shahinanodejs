/*
 *
 *
 */

var MAX_DRIVER_ACCEPTED = 3;

exports.init = function (App, socket) {

    socket.on('suggestPrice', function (Req) {
        try {
            App.log.error("New Suugest fot trip '" + Req.orderId + "' with token " + Req.connToken)
            if (App.trips.get(Req.orderId).waitingDrivers.length <= MAX_DRIVER_ACCEPTED) {
                var driver = App.MDB.get(Req.connToken).data;
                driver.driverToken = Req.connToken;
                var driverData = App.modules.users.makeDriverData(driver, Req.amount);
                App.trips.get(Req.orderId).waitingDrivers.push(driverData);
            } else {
                socket.emit('orderAlreadyAccepted')
            }
        } catch (e) {
            App.log.error(e.message)
        }
    })
}