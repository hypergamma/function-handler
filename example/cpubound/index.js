exports.handler = function(event, callback) {
    var itercount = event.count;
    var result = 2;

    for (var i = 0; i < itercount ; i++) {
        result = result * 2;
    }

    callback(null, "sqrt(2, " + itercount + ") = " + result);
};

