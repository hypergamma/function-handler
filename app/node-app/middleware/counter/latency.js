'use strict'

const os = require('os');
const influx = require('./influx.js');
var onHeaders = require('on-headers');

var nfunc = process.env.FUNC_NAME;
var nuser = process.env.USER_NAME;
var host = os.hostname();

/**
 * Function Latency Counter:
 *
 * 함수 응답 시간을 기록하는 카운터.
 */

var latency = function (req, res, next) {

    var startAt = process.hrtime();

    onHeaders(res, function onHeaders() {
        var diff = process.hrtime(startAt);
        var timetaken = diff[0] * 1e3 + diff[1] * 1e-6;

        influx.writePoints([
            {
                measurement: 'handler',
                tags: { host: host, nfunc: nfunc, nuser: nuser },
                fields: { latency: timetaken },
            }
        ]).catch(function(err) {
            console.error('error: '+ err.stack);
        });
    });

    next();
}

module.exports = latency;