'use strict'

var conf = require('./conf/influx.json');
const Influx = require('influx');

/**
 * Influxdb repository
 */
const influx = new Influx.InfluxDB(conf.endpoint);
influx.schema = [
    {
        measurement: 'handler',
        fields: {
            num_invokes: Influx.FieldType.INTEGER,
            num_errors: Influx.FieldType.INTEGER,
            latency: Influx.FieldType.FLOAT,
            cpu_usage_percent: Influx.FieldType.FLOAT,
            mem_usage_bytes: Influx.FieldType.INTEGER
        },
        tags: [
            'nfunc',
            'nuser',
            'host'
        ]
    }
];

module.exports = influx;