exports.init = function (App, socket) {
    var SCOPE_PATH = App.path + '/IO/Client/';

    /**
     * connect to  server
     * add driver or client to its array
     * emit back conn token
     *
     */

    require(SCOPE_PATH + 'RequestOrder').init(App, socket);

    require(SCOPE_PATH + 'CancelTrip').init(App, socket);

    require(SCOPE_PATH + 'SelectSuggestedPrice').init(App, socket);

    require(SCOPE_PATH + 'ReviewDriver').init(App, socket);


}


