exports.init = function (Cons, Http) {

    return {
        /**
         *
         * @param orderId
         * @param callback
         * @param err
         */
        addTransactionForTrip: function (orderId, callback, err) {
            var opt = {
                host: Cons.baseServerHost,
                path: encodeURI(Cons.urls.client.addPayment + "?order_id=" + orderId.substring(3)),
            }
            Http.get(opt, function (suc) {
                if (callback != undefined)
                    callback(suc)
            }, function (er) {
                if (err != undefined)
                    err(er)
            });
        },
        getDriverInvoicByOrderId: function (orderId, callback, err) {

            var opt = {
                host: Cons.baseServerHost,
                path: encodeURI(Cons.urls.driver.getDriverInvoiceByOrderId + orderId.substring(3)),
            }

            Http.get(opt, function (suc) {
                if (callback != undefined)
                    callback(suc)
            }, function (er) {
                if (err != undefined)
                    err(er)
            });

        }
    }
}
