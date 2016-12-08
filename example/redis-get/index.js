var redis = require('redis');

var conf = {
    "host": "52.187.36.188",
    "port": 6379
};

exports.handler = function(event, callback) {
    var name = event.name;
    //callback(null, "Hello from Gamma event handler:).. modified, I'm " + name);

    var client = redis.createClient(conf);

    client.on("error", function (err) {
        //"RegistryAccessError"
        callback("redis client error", null);
    });

    client.get("hello-world",  function (err, res) {
        //"RegistrySetMethodError"
        if (err) {
            callback("redis client error", null);
        } else {
            callback(null, "Hello " + name + " redis res = " + res);
        }
    });
};

