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
            latency: Influx.FieldType.FLOAT
        },
        tags: [
            'funcname',
            'host'
        ]
    }
];

module.exports = influx;