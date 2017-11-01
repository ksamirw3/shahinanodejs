exports.init = function (App, socket) {

    var SCOPE_PATH = App.path + '/IO/Shared/';

    /**
     * connect to  server
     * add driver or client to its array
     * emit back conn token
     *
     */

    require(SCOPE_PATH + 'InitConnect').init(App, socket);

    /**
     *
     * chat method
     *
     */

    require(SCOPE_PATH + 'SendMessage').init(App, socket);

    /**
     *
     * disconnect method
     *
     */

    require(SCOPE_PATH + 'DisConnect').init(App, socket);

    /**
     *
     *  current trip
     */

    require(SCOPE_PATH + 'CurrentTrip').init(App, socket);


    socket.on('fireLiveTracking', function () {
        var allDrivers = App.MDB.allDrivers();
        var backList = [];
        for (var i in allDrivers) {
            var currenDriver = allDrivers[i];
            backList.push({
                token: 'driver' + i,
                position: {lat: currenDriver.data.latitude, lng: currenDriver.data.longitude}
            })
        }
        io.emit('driverList', {drivers: backList})
    });

}