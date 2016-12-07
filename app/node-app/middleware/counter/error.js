const os = require('os');
const influx = require('./influx.js');

var nfunc = process.env.FUNC_NAME;
var nuser = process.env.USER_NAME;
var host = os.hostname();
/**
 * Function Error Counter:
 *
 * 함수 에러 발생량을 측정하는 카운터.
 */
var error = function (err, req, res, next) {

    influx.writePoints([
        {
            measurement: 'handler',
            tags: { host: host, nfunc: nfunc, nuser: nuser },
            fields: { num_errors: 1 },
        }
    ]).catch(function(err) {
        console.error('error: '+ err.stack);
    });

    next();
};

module.exports = error;