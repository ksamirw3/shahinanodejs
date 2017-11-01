var TIME_OUT = 1000;

var RUN = 1;

var STOP = 0;

var NOT_STARTED = 2;

var allTrips = [];

module.exports = {
    run: RUN,
    stop: STOP,
    notStarted: NOT_STARTED,

    add: function (tripToken, $data) {
        $data.waitingDrivers = [];
        $data.driverToken = null;
        $data.isTripStarted = false;

        $data.coordinates = [];
        $data.chats = [];
        $data.status = NOT_STARTED;
        allTrips[tripToken] = $data;
    }
    ,

    all: function () {
        return allTrips;
    }
    ,

    get: function (tripToken) {
        return allTrips[tripToken];
    }
    ,

    addPointToTrip: function (tripToken, lat, lng) {
        allTrips[tripToken].coordinates.push({'lat': lat, 'lng': lng});
    }
    ,


    update: function ($tripToken, $key, value) {
        return allTrips[$tripToken][$key] = value;
    },

    assainDriver: function ($tripToken, value) {
        allTrips[$tripToken].driverToken = value;
    }
    ,
    pushChat: function (chatObj) {

    },

    trip: function (orderID) {
        return {
            assainDriverObj: function (driverObj) {

                var filterData = ['full_name', 'phone', 'rate', 'presonal_image', 'plate_no'];
                var newData = {}

                for (var f in filterData) {
                    newData[filterData[f]] = driverObj.data[filterData[f]];
                }
                console.log(newData)
                allTrips[orderID].driver = newData;
                // allTrips[orderID].driver = driverObj.data;
            },
            addLocationPoint: function (lat, lng) {
                allTrips[orderID].coordinates.push({lat: parseFloat(lat), lng: parseFloat(lng)});
            }
        }
    }
    ,

    assainDriver: function ($tripToken, value) {
        allTrips[$tripToken].driverToken = value;
    }
    ,
    pushChat: function (chatObj) {

    }
    ,

    trip: function (orderID) {
        return {
            delete: function () {
                delete allTrips[orderID];
            },
            hasDriver: function () {
                if (allTrips[orderID].driverToken == null)
                    return false;
                return true;
            },
            startTrip: function () {
                allTrips[orderID].isTripStarted = true;
            },
            end: function () {
                allTrips[orderID].isTripStarted = false;

            },
            pushChatObj: function (chteObj) {
                allTrips[orderID].chats.push(chteObj);
            },
            assainDriverObj: function (driverObj) {

                var filterData = ['full_name', 'phone', 'rate', 'presonal_image', 'plate_no'];
                var newData = {}

                for (var f in filterData) {
                    newData[filterData[f]] = driverObj.data[filterData[f]];
                }
                console.log(newData)
                allTrips[orderID].driver = newData;
                // allTrips[orderID].driver = driverObj.data;
            },
            addLocationPoint: function (lat, lng) {
                allTrips[orderID].coordinates.push({lat: parseFloat(lat), lng: parseFloat(lng)});
            }
        }
    }
}