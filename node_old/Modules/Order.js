exports.init = function (Cons, http) {
    var _this = this;

    /*
     *
     *
     */

    _this.host = Cons.baseServerHost;

    /*
     *
     *
     */

    _this.makeDataObject = function (ordeData) {
        return {
            recommended_place: ordeData.recommendedPlace,
            amount: ordeData.amount,
            category_id: ordeData.categoryId,
            description: ordeData.description,
            to_latitude: ordeData.toLatitude,
            to_longitude: ordeData.toLongitude,
            to_address: ordeData.toAddress,
            from_latitude: ordeData.fromLatitude,
            from_longitude: ordeData.fromLongitude,
            from_address: ordeData.fromAddress,
            trip_type: ordeData.type,
            image: ordeData.image,
            client_id: ordeData.connToken.substring(2),
            custom_category: ordeData.customCategory,
            receiver_phone: ordeData.receiverPhone,
            receiver_name: ordeData.receiverName,
        }

    }

    /*
     *
     *
     */


    _this.updateTrip = function (orderId, key, val, suc, err) {
        var opt = {
            host: _this.host,
            path: Cons.urls.driver.updateDriverId + "?order_id=" + orderId + "&val=" + val + "&key=" + key,
        }

        http.get(opt, function (res) {
            if (suc != undefined)
                suc(res);
        }), function (e) {
            err(e);
        }
    }

    return {
        /**
         *
         * @param ordeData
         * @param callback
         * @param err
         */
        saveToDB: function (ordeData, callback, err) {
            var opt = {
                host: _this.host,
                path: Cons.urls.client.createOrder,
                data: _this.makeDataObject(ordeData),
            }
            http.post(opt, function (req) {
                console.log(req);
                callback(req.data)
            }, function (e) {
                err(e);
            })

        },
        /**
         *
         * @param orderToken
         * @param driverToken
         * @param callback
         * @param err
         */
        assainDriverTotrip: function (orderToken, driverToken, callback, err) {

            _this.updateTrip(orderToken.substring(3), 'driver_id', driverToken.substring(2), function (res) {
                if (callback != undefined)
                    callback(res)
            }, function (e) {
                if (err != undefined)
                    err(e)
            })

        },

        /**
         *
         * @param orderToken
         * @returns {{cancel: cancel, executed: executed}}
         */

        setTripStatus: function (orderToken) {
            var $this = this;
            $this.changeStatus = function (status, callback, err) {
                _this.updateTrip(orderToken.substring(3), 'status', status, function (res) {
                    if (callback != undefined)
                        callback(res)
                }, function (e) {
                    if (err != undefined)
                        err(e)
                })
            }
            return {
                cancel: function () {
                    $this.changeStatus(0)
                },
                executed: function () {
                    $this.changeStatus(2)
                },
            }

        }
    }
}

