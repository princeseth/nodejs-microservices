const express = require('express');

const service = express();

const Employees = require('./lib/Employees');

module.exports = (config) => {
    const log = config.log();

    const employees = new Employees(config.data.employees);

    // request logging
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }
    service.use('/images/', express.static(config.data.images));

    service.get('/list', async (req, res, next) => {
        try {
            return res.json(await employees.getList());
        } catch (err) {
            return next(error);
        }
    });
    service.get('/names', async (req, res, next) => {
        try {
            return res.json(await employees.getNames());
        }
        catch (err) {
            return next(err);
        }
    });
    service.get('/employees/:shortname', async (req, res, next) => {
        try {
            return res.json(await employees.getEmployee(req.params.shortname));
        }
        catch (err) {
            return next(err);
        }
    });
    service.get('/work/:shortname', async (req, res, next) => {
        try {
            return res.json(await employees.getWorkForEmployee(req.params.shortname));
        }
        catch (err) {
            return next(err);
        }
    });

    service.get('/work', async (req, res, next) => {
        try {
            return res.json(await employees.getWorkList());
        }
        catch (err) {
            return next(err);
        }
    });

    // eslint-disable-next-line no-unused-vars
    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        log.error(error);

        return res.json({
            error: {
                message: error.message,
            }
        });
    });
    return service;
}