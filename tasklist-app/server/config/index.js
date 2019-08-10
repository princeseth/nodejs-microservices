const path = require('path');

module.exports = {
    development: {
        sitename: 'Task List',
        data: {
            employees: path.join(__dirname, '../data/employee.json'),
            tasks: path.join(__dirname, '../data/task.json'),
        }
        // serviceRegistryUrl: 'http://localhost:3000',
        // serviceVersionIdentifier: '1.x.x',
    },
    production: {
        sitename: 'Task List Prod',
        data: {
            employees: path.join(__dirname, '../data/employee.json'),
            tasks: path.join(__dirname, '../data/task.json'),
        }
        // serviceRegistryUrl: 'http://localhost:3000',
        // serviceVersionIdentifier: '1.x.x',
    },
};