exports.init = function (dirname) {
    var File = require('./File');
    var env = File.toJson(dirname + '/env.json').env;
    var envData = File.toJson(dirname + '/envs/' + env + '.json');
    var baseServerHost = envData.path;
    var apiURL = envData.api;
    var clientApi = apiURL + '/client';
    var driverApi = apiURL + '/driver';
    var sharedApi = apiURL + '/shared';
    return {
        baseServerHost: baseServerHost,
        apiURL: apiURL,
        clientApi: clientApi,
        driverApi: driverApi,
        destLimit: 5,
        urls: {

            client: {
                base: clientApi,
                review: clientApi + "/reviews/create-review",
                getById: clientApi + "/users/by-id/",
                createOrder: clientApi + "/orders/create-order",
                addPayment: clientApi + "/transactions/set-payment-for-trip"
            },
            driver: {
                base: driverApi,
                getById: driverApi + "/users/by-id/",
                updateDriverId: driverApi + "/orders/update",
                getDriverInvoiceByOrderId: driverApi + "/transactions/invoice?order_id="

            },
            shared: {
                base: sharedApi,
                insertOrGetCategory: sharedApi + "/category/add-new",

            }

        },
    }


}

// var bsaeBackEnd = '35.167.101.93';
// var api = '/v1/api';
// var clientApi = api + '/client';
// var driverApi = api + '/driver';




