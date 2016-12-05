exports.handler = (event, callback) => {
    var name = event.name;
    callback(null, "Hello from Gamma, I'm " + name);
};

