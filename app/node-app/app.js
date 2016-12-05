var express = require('express');
var bodyParser = require('body-parser');
var userEventHandler = require('./user-event-handler');

var app = express();

var allowCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ?
        res.send(200) :
        next();
};

app.use(allowCORS);
app.use(bodyParser.json()); // for parsing application/json

/*
req.body = {
    "params": {
        "key1": "keyyyyy",
        "key2": "key2222"
    }
}
 */
app.post('/', function(req, res){
    var params = req.body.params;
    var callback = function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    };

    userEventHandler.handler(params, callback);

});

app.listen(8080);
