const bunyan = require('bunyan');
const path = require('path');

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
        data: {
            employees: path.join(__dirname, '../data/employee.json'),
            images: path.join(__dirname, '../data/images'),
        }
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info'),
        data: {
            employees: path.join(__dirname, '../data/employee.json'),
            images: path.join(__dirname, '../data/images'),
        }
    }
}