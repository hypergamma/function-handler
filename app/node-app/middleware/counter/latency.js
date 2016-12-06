'use strict'

const os = require('os');
const influx = require('./influx.js');
var onHeaders = require('on-headers');

/**
 * Function Latency Counter:
 *
 * 함수 응답 시간을 기록하는 카운터.
 */

var latency = function (req, res, next) {

    var funcname = req.body.params.name;
    var startAt = process.hrtime()

    onHeaders(res, function onHeaders() {
        var diff = process.hrtime(startAt);
        var timetaken = diff[0] * 1e3 + diff[1] * 1e-6;

        influx.writePoints([
            {
                measurement: 'handler',
                tags: { host: os.hostname(), funcname: funcname },
                fields: { latency: timetaken },
            }
        ]).catch(function(err) {
            console.error('error: '+ err.stack);
        });
    });

    next();
}

module.exports = latency;