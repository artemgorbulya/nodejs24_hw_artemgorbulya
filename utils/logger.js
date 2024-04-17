function logger(moduleName) {
    return {
        info: function(message) {
            console.log(moduleName + ': ' + message);
        },
        warn: function(message) {
            console.warn(moduleName + ': ' + message);
        },
        error: function(message) {
            console.error(moduleName + ': ' + message);
        }
    };
}

module.exports = logger;