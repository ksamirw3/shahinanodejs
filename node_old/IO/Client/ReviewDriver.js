exports.init = function (App, socket) {
    socket.on('reviewDriver', function (Req) {
        App.modules.review.createReview(Req, function (res) {
            console.log(res)
        });
    })
}