var AVARAGE_VELOCITY = 60;
var MINUTES_IN_HOUR = 60;
var R = 6371; // Radius of the earth in km

exports.calculateDistance = function (point1, point2) {
    var _this = this;
    _this.pointOne = point1;
    _this.pointTwo = point2;
    /**
     * convert degree to rad
     * @param deg
     * @returns {number}
     */
    _this.deg2rad = function (deg) {
        return deg * (Math.PI / 180)
    }
    /**
     * calc main function
     */
    _this.main = function () {

        var dLat = _this.deg2rad(_this.pointTwo.lat - _this.pointOne.lat);  // deg2rad below
        var dLon = _this.deg2rad(_this.pointTwo.lng - _this.pointOne.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(_this.deg2rad(_this.pointOne.lat)) * Math.cos(_this.deg2rad(_this.pointTwo.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    return {
        distance: function () {
            return _this.main() * 1000;
        },
        time: function () {
            return (_this.main() / AVARAGE_VELOCITY) / MINUTES_IN_HOUR;
        }
    }
}
