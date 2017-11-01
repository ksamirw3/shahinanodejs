exports.init = function (App, socket) {
    var SCOPE_PATH = App.path + '/IO/Driver/';

    /*
     *
     */

    require(SCOPE_PATH + 'UpdateLocation').init(App, socket);

    /*
     *
     */

    require(SCOPE_PATH + 'AcceptOrder').init(App, socket);

    /*
     *
     */

    require(SCOPE_PATH + 'EndTrip').init(App, socket);

    /*
     *
     */

    require(SCOPE_PATH + 'StartTrip').init(App, socket);

    /*
     *
     */

    require(SCOPE_PATH + 'SuggestPrice').init(App, socket);




}