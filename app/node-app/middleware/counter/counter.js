const os = require('os');
const Influx = require('influx');
var conf = require('./conf/influx.json');
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

var counter = function (req, res, next) {

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


module.exports = counter;