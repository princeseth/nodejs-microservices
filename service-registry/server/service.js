const express = require('express');
const ServiceRegistery = require('./lib/ServiceRegistry');

const service = express();

module.exports = (config) => {
    const log = config.log();
    const serviceRegistery = new ServiceRegistery(log);
    // request logging
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.put('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
        // constructing object ES6 notation
        const { servicename, serviceversion, serviceport } = req.params;
        //Some system gives IP address in ipv6 notation, therefore adding check for ipv6
        const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

        const serviceKey = serviceRegistery.register(servicename, serviceversion, serviceip, serviceport);
        return res.json({ result: serviceKey });
    });

    service.delete('/delete/:servicename/:serviceversion/:serviceport', (req, res) => {
        // constructing object ES6 notation
        const { servicename, serviceversion, serviceport } = req.params;
        //Some system gives IP address in ipv6 notation, therefore adding check for ipv6
        const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

        const serviceKey = serviceRegistery.unregister(servicename, serviceversion, serviceip, serviceport);
        return res.json({ result: serviceKey });
    });
    service.get('/find/:servicename/:serviceversion', (req, res) => {
        const { servicename, serviceversion } = req.params;

        const svc = service.get(servicename, serviceversion);
        if (!svc) return res.status(404).json({ result: 'Service not found' });
        return res.json(svc);
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