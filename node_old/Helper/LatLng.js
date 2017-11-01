var latlng = function (lat, lng) {
    var _this = this;
    _this.lat = (lat == undefined) ? '' : lat;
    _this.lng = (lng == undefined) ? '' : lng;

    return {
        toJson: function () {
            return {lat: _this.lat, lng: _this.lng};
        }
    }
}

exports.newInstans = latlng;

exports.new = function (lat, lng) {
    return new latlng(lat, lng);
}