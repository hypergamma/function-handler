var express = require('express');
var bodyParser = require('body-parser');
var userEventHandler = require('./user-event-handler');

// counter middleware
var invocation = require('./middleware/counter/invocation.js');
var latency = require('./middleware/counter/latency.js');
var resource = require('./middleware/counter/resource.js');
var error = require('./middleware/counter/error.js');

var schedule = require('node-schedule');

// Handler main
// ----------------------------------------------------------------------------------------------------
var port = 3000;
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
app.use(invocation);
app.use(latency);

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
    resource.getResourceUsage();
});

app.use(error);
app.listen(port);

// Resource monitor
// ----------------------------------------------------------------------------------------------------
// scheduling rules
// var rule = new schedule.RecurrenceRule();
// rule.second = [0, 10, 20,30, 40, 50];
// schedule.scheduleJob('monitor', rule, () => {
//     resource.getResourceUsage();
// });

