var persone = function (config) {

    /*
     * init data and attrs
     * @type type
     */

    var personeObject = {
        type: '',
        currentTrip: '',
        data: {},
        status: '',
        trip: null,
        totalTrips: []
    };




    /*
     * meagrg data with init data
     */

    Object.assign(personeObject, config);

    /*
     *
     *
     */

    personeObject.withTrip = function () {
        var _this = this;
        return {
            setCurent: function (tripId) {
                _this.currentTrip = tripId;
            },
            getCurrentTrip: function () {
                return _this.currentTrip;
            }
        }
    }

    /*
     * set sql data to object
     * @param {type} data
     * @returns {undefined}
     */

    personeObject.updateData = function (data) {
        Object.assign(this.data, data)
        return this.data;
    }

    personeObject.setData = function (data) {
        this.data = data;
    }

    /*
     * get sql data from object
     * @returns {type}
     */

    personeObject.getData = function () {
        return this.data
    }

    return personeObject;

}



exports.create = function (config) {
    return persone(config)
}
