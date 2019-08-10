const bunyan = require('bunyan');

const pjs = require('../package.json'); // load package json

const { name, version } = pjs; // Get name & version from json

const getLogger = (serviceName, serviceVersion, level) =>
    bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'debug'),
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info'),
    }
}