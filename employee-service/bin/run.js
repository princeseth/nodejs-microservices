const axios = require('axios');

const http = require('http');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();

const service = require('../server/service')(config);

const server = http.createServer(service);

server.listen(0); // choosing the port randomly by nodejs

server.on('listening', () => {
    const registerService = () => axios.put(`http://localhost:3000/register/${config.name}/${config.version}/${server.address().port}`);

    const unregisterService = () => axios.delete(`http://localhost:3000/register/${config.name}/${config.version}/${server.address().port}`);

    registerService();


    const interval = setInterval(registerService, 20000);
    const cleanup = async () => {
        clearInterval(interval);
        await unregisterService();
    }
    // unregister service if any exception occured
    process.on('uncaughtException', async () => {
        await cleanup();
        process.exit(0);
    });

    //if ctrl+c is pressed
    process.on('SIGINT', async () => {
        await cleanup();
        process.exit(0);
    });

    //killing the process
    process.on('SIGTERM', async () => {
        await cleanup();
        process.exit(0);
    });

    log.info(
        `Hi! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
    )
})