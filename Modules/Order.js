exports.init = function (Cons, http) {
    var _this = this;
    var request = require('request');

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
        console.log('updateTrip >>> ', Cons.urls.driver.updateDriverId + "?order_id=" + orderId + "&val=" + val + "&key=" + key);
        var opt = {
            host: _this.host,
            path: Cons.urls.driver.updateDriverId + "?order_id=" + orderId + "&val=" + val + "&key=" + key,
        }

        console.log('opt >>> ', opt);

        http.get(opt, function (res) {
            console.log('updateTrip  get >>> ', res);

            if (suc != undefined)
                suc(res);
        }), function (e) {
            err(e);
        }
    }

    return {
        updateAmount: function (orderToken, amount, callback, err) {
            _this.updateTrip(orderToken.substring(3), 'amount', amount, function (res) {
                if (callback != undefined)
                    callback(res)
            }, function (e) {
                if (err != undefined)
                    err(e)
            })
        },
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
                data: /*_this.makeDataObject(*/ordeData/*)*/,
            }

//            request.post({url:'http://18.221.7.8:8081/api/client/orders/create-order', form: ordeData}, function(err,httpResponse, body){ 
//                if(err)
//                    console.log('err: '+err);
//
//                if (typeof body == 'string')
//                    req = JSON.parse(body);
//                
//                console.log("req >>> ", req);
//
//                if (req.data) {
//                    console.log("saveRquestDataResponse ------------------------------- ", req.data);
//                    callback(req.data);
//                }
//            })

            console.log("saveToDB options >>> ", opt);

            http.post(opt, function (req) {

                console.log("saveToDB >>> ", req);

                if (typeof req == 'string')
                    req = JSON.parse(req);

                if (req.data) {
                    console.log("saveRquestDataResponse ------------------------------- ", req.data);
                    callback(req.data);
                }
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

            console.log('assainDriverTotrip:>>> ', orderToken, driverToken);

            _this.updateTrip(orderToken, 'driver_id', driverToken.substring(2), function (res) {
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

