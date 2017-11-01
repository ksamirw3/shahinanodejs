/**
 *
 * @param App
 * @param socket
 */
exports.init = function (App, socket) {
    var Helper = HelperModule(App);
    socket.on('initConnection', function (Req) {
        console.log("initConnection called");
        console.log(JSON.stringify(Req));
        try {
            var socketId = socket.id;
            var initCons = Helper.getPathAndType(Req);
            console.log(initCons);


            App.modules.users.getUserInfo(initCons.path + Req.id, function (userData) {
                var personData = App.persons.create({socketId: socketId, type: Req.type, data: userData})
                Helper.addUserToDB(socket, initCons.type + Req.id, personData, Req);
                var token = initCons.type + Req.id;
                if (userData) {
                    App.IO.emit('addDriverToMap', {
                        lat: parseFloat(userData.latitude),
                        lng: parseFloat(userData.longitude),
                        socketToken: token
                    });
                }
                // App.modules.order.getmyopen(Req, function () {
                //     Helper.addUserToDB(socket, initCons.type + Req.id, personData)
                // })
            })

            Helper.fetchOpenTrips(Req);

        } catch (e) {
            App.log.error('on socket "' + socket + '" ' + e.message + " has occur");
        }
    })
}


var HelperModule = function (App) {
    return {
        /**
         *
         * @param Req
         */

        fetchOpenTrips: function (Req) {

        },

        /**
         *
         * @param Req
         * @returns {{path: string, type: string}}
         */
        getPathAndType: function (Req) {
            var URLS = App.cons.urls;
            var path = "", type = "";
            if (Req.type == 'driver') {
                path = URLS.driver.getById;
                type = App.MDB.types.driver;
            } else {
                path = URLS.client.getById;
                type = App.MDB.types.client;
            }
            return {path: path + "/", type: type}
        },
        /**
         *
         * @param socket
         * @param connToken
         * @param data
         */
        addUserToDB: function (socket, connToken, data, Req) {
            socket.emit("setToken", {'connToken': connToken})
            var driver = App.MDB.get(connToken);
            var newData = '';

            if (driver == undefined) {
                newData = data;
            } else {
                newData = driver;
                newData.data = data.data;
                newData.socketId = socket.id;
                newData.type = Req.type;
                newData.data = data.data;
            }

            App.MDB.add(connToken, newData);

            App.log.info(connToken + ' add with key : ' + socket.id);
        }
    }
}