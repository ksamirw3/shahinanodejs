exports.init = function (App, socket) {
    socket.on('disconnect', function (req) {
        App.MDB.delete(socket.id )
        App.Log.error(socket.id + ' was logout with message ' + req)
    })
}