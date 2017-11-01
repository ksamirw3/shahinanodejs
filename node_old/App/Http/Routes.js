exports.serve = function (app, ROOT_PATH) {

    var VIEW_PATH = ROOT_PATH + '/Pages/'

    app.get('/', function (req, res) {
        res.sendFile(VIEW_PATH + 'any.html');
        // res.send('');
    });

    app.get('/map', function (req, res) {
        res.sendFile(VIEW_PATH + 'map.html');
    });
    app.get('/client', function (req, res) {
        res.sendFile(VIEW_PATH + 'client.html');
    });
    app.get('/all', function (req, res) {
        res.sendFile(VIEW_PATH + 'all.html');
    });
    app.get('/driver', function (req, res) {
        res.sendFile(VIEW_PATH + 'map.html');
    });
}



