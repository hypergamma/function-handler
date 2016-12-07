const os = require('os');
const influx = require('./influx.js');

/**
 * Function Invocation Counter:
 *
 * 함수 호출수를 측정하는 카운터.
 */
var invocation = function (req, res, next) {

    // TODO: handler의 func name 파라미터를 확정할 것
    var funcname = req.body.params.name;

    influx.writePoints([
        {
            measurement: 'handler',
            tags: { host: os.hostname(), funcname: funcname },
            fields: { num_invokes: 1 },
        }
    ]).catch(function(err) {
        console.error('error: '+ err.stack);
    });

    next();
};

module.exports = invocation;