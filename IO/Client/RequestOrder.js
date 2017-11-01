/*
 * set time out for waiting for trip
 */
var SECONDS_TO_TIMEOUT = 30;


module.exports.init = function (App, socket) {
    socket.on('requestOrder', function (Req) {
        if (Req.type == "bring") {
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            App.modules.category.insertOrGetCategory(Req, function (res) {
                //res.name_ar
                //res.name_en
                InitModule(App, socket).main(Req, {categoryAr: 'c1', categoryEn: 'c2'});
            })
        } else {
            console.log('22222222222222222222222222');
            console.log('22222222222222222222222222');
            console.log('22222222222222222222222222');
            console.log('22222222222222222222222222');
            console.log('22222222222222222222222222');
            console.log('22222222222222222222222222');
            console.log(Req);
            InitModule(App, socket).main(Req);
        }
    })
}


var InitModule = function (App, socket) {

    /*
     *
     */

    var _this = this;

    /*
     *
     * @param App
     * @param socket
     * @param Req
     * @param CategoryData
     */

    _this.main = function (Req, CategoryData) {

        App.modules.order.saveToDB(Req, function (serverRes) {
            try {

                console.log("saveOrderRes", serverRes);

                App.log.error("request from client token : " + Req.connToken);

                /*
                 *
                 * init data and send back order token to client
                 *
                 */

                var initData = _this.initData(Req, serverRes.id);

                console.log("saveOrderRes", serverRes);


                /*
                 *
                 * loop on online driver and emit them a trip data
                 *
                 *
                 */

                var sendData = _this.sendTripToAllAvaliabelDrivers(Req, initData, CategoryData);

                /*
                 *
                 *
                 *
                 */


                if (sendData.driverCount == 0) {
                    socket.emit('noDriverFound');
                    return;
                }

                /*
                 *
                 * add trip to token
                 *
                 */

                App.trips.add(initData.tripToken, sendData.tripData);

                console.log("allTripsData", App.trips.all());

                /*
                 * finish trip request after time out
                 */

                App.session.add(initData.tripToken, SECONDS_TO_TIMEOUT, function () {
                    try {
                        _this.finlizeRequestAfterTimeOut(App, socket, Req, sendData.tripData, initData.tripToken);
                    } catch (e) {
                        App.log.error(e.message)
                    }
                })
            } catch (e) {
                App.log.error(e)
            }
            return;
        }, function (e) {
            console.log(e)
        });
    }

    /*
     *
     *
     */

    _this.addCategoryData = function (tripData, CategoryData) {
        if (CategoryData != undefined)
            return Object.assign(tripData, CategoryData);
        return tripData;
    }

    /*
     * init data
     * add token trip
     * init client data and info
     * @param App
     * @param socket
     * @param Req
     * @returns {{tripToken: *, clientData}}
     */

    _this.initData = function (Req, ordId) {

        /*
         *
         * create trip token
         *
         */

        var tripId = "ord" + ordId;

        var tripToken = App.rand.get();

        /*
         *
         * emait back token to client
         *
         */

        socket.emit('tripToken', {'tripToken': tripToken});

        /*
         *
         * init client data
         *
         */

        var clientData = App.MDB.get(Req.connToken);

        /*
         *
         * init data to send
         *
         */


        var sendData = Req;
        sendData.clientId = Req.connToken;
        sendData.orderId = tripId;
        sendData.tripToken = tripToken;
        sendData.client = clientData.data;
        return {
            tripToken: tripToken, sendData: sendData, clientData: clientData
        }
    }

    /*
     *
     * @param App
     * @param Req
     * @param initData
     * @returns {{tripData: *, driverCount: number}}
     */

    _this.sendTripToAllAvaliabelDrivers = function (Req, initData, CategoryData) {

        /*
         *
         */
        var sendData = _this.addCategoryData(initData.sendData, CategoryData);

        /*
         *
         *
         */

        var drivers = App.MDB.allDrivers();

        /*
         * driver list
         *
         */

        var receivedList = [];

        /*
         *
         * init driver for set no driver
         *
         */
        var driverCount = 0;
        /*
         * create from point
         *
         */
        var fromPonit = {lat: Req.from_latitude, lng: Req.from_longitude}
        /*
         *loop in drivers list
         *
         *
         */
        console.log("drivers", drivers);
        for (var driver_id in drivers) {
            if (drivers.hasOwnProperty(driver_id)) {
                var driver = drivers[driver_id];
                // check data of driver
                if (driver.trip == null) {
                    if (driver.data != undefined) {
                        // check data of driver
                        var driverData = driver.data;
                        // validate data of lat and long
                        if (driverData.latitude != null && driverData.longitude != null) {
                            var endPoint = {lat: driverData.latitude, lng: driverData.longitude};
                            // chek if dest is less than const lenght and it is in meters
                            if (App.calc.calculateDistance(fromPonit, endPoint).distance() <= (App.cons.destLimit * 1000)) {
                                App.log.info(" emit new order receved to driver : " + driver.socketId)
                                // send time of start
                                App.IO.to(driver.socketId).emit('newOrderReceived', sendData);
                                receivedList.push(driver.socketId);
                                driverCount++;
                            }
                        }
                    }
                }
            }
        }
        sendData.recevedList = receivedList;
        console.log("recievedDrivers", receivedList);
        return {tripData: sendData, driverCount: driverCount};
    }

    /*
     *
     *  this fsdjsdf jjsd sfdjdsjsd  djjfd  dsjdsdsj
     *
     *
     * @param App
     * @param socket
     * @param Req
     * @param sendData
     * @param tripToken
     */

    _this.finlizeRequestAfterTimeOut = function (App, socket, Req, sendData, tripToken) {


        App.log.info('set time out for trip token  : ' + tripToken);

        var trip = App.trips.get(tripToken);
        console.log("----------------------------------------------------------");
        console.log("trips", App.trips.all());
        console.log("currentTrip", trip);


        if (trip.waitingDrivers.length > 0) {
            App.log.info('client token  for suggest on trip (' + tripToken + '): ' + Req.connToken);
            console.log("suggestList", {
                orderId: tripToken,
                list: trip.waitingDrivers
            });

            console.log("Req.connToken", Req.connToken, "App.MDB.get(Req.connToken)", App.MDB.get(Req.connToken));
            App.IO.to(App.MDB.get(Req.connToken).socketId).emit('suggestPriceList', {
                orderId: tripToken,
                list: trip.waitingDrivers
            })
            return;
        } else {
            socket.emit('noDriverAccept');
        }

        for (var dri in  sendData.recevedList) {
            App.IO.to(sendData.recevedList[dri]).emit('tripTimeOut');
        }

        App.session.clear(tripToken);
        App.modules.order.setTripStatus(trip.orderId).cancel();
        App.trips.trip(tripToken).delete();
        console.log("----------------------------------------------------------");

    }

    /*
     *
     */

    return {
        main: function (Req, CategoryData) {
            return _this.main(Req, CategoryData)
        }
    }
}