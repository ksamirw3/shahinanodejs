exports.serve = function (app, ROOT_PATH) {

    var VIEW_PATH = ROOT_PATH + '/Pages/'
    var http = require('http');
    var request = require('request');

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


    app.get('/test', function (req, res) {
        console.log("test >>> ");

        request('http://18.221.7.8:8081/api/driver/', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        
        res.send(body);
        });

//        http.get({
//            hostname: 'http://18.221.7.8',
//            port: 8081,
//            path: 'api/driver/',
//            agent: false  // create a new agent just for this one request
//        }, (result) => {
//            res.send(result);
//        });


//            http.get("http://18.221.7.8:8081/api/driver/", (result) => {
//                console.log("saveToDB res >>> ", result);
//                res.send(result);
//        });
    });

}



