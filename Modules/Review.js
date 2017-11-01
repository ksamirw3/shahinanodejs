InitData = function (data) {
    return {
        userId: data.connToken.substring(2),
        driverId: data.driverToken.substring(2),
        rate: data.rate,
        comment: data.comment,
        orderId: data.orderId.substring(3)
    }
}

exports.init = function (Cons, Http) {
    return {
        createReview: function (data, result, error) {
            var modifiedData = InitData(data);
            var opt = {
                host: Cons.baseServerHost,
                path: encodeURI(Cons.urls.client.review + "?user_id=" + modifiedData.userId + "&driver_id=" + modifiedData.driverId + "&rate=" + modifiedData.rate + "&comment=" + modifiedData.comment + "&order_id=" + modifiedData.orderId)
            }
            Http.get(opt, function (res) {
                if (result != undefined)
                    result(res)
            }, function (err) {
                if (error != undefined)
                    error(err)
            })
        }
    }
}