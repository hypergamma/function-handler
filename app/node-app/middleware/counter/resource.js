const os = require('os');
const influx = require('./influx.js');
var pusage = require('pidusage');

var nfunc = process.env.FUNC_NAME;
var nuser = process.env.USER_NAME;
var host = os.hostname();
/**
 * Function Invocation Counter:
 *
 * 함수의 리소스 사용량을 측정하는 카운터.
 */
var resource = {
    getResourceUsage: getResourceUsage
};

function getResourceUsage() {
    pusage.stat(process.pid, function(err, stat) {
        var cpu_usage_percent = stat.cpu;
        var mem_usage_bytes = stat.memory;

        writeResourceUsage(cpu_usage_percent, mem_usage_bytes);
    })
}

function writeResourceUsage(cpu_usage_percent, mem_usage_bytes) {

    influx.writePoints([
        {
            measurement: 'handler',
            tags: { host: host, nfunc: nfunc, nuser: nuser },
            fields: { cpu_usage_percent: cpu_usage_percent, mem_usage_bytes: mem_usage_bytes },
        }
    ]).catch(function(err) {
        console.error('error: '+ err.stack);
    });
};

module.exports = resource;