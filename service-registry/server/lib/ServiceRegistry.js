const semver = require('semver');

class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 60;
    }

    get(name, version) {
        this.cleanup();
        const candidates = Object.values(this.services)
            .filter(service => service.name === name && semver.satisfies(service.version, version));

        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    register(name, version, ip, port) {
        this.cleanup();
        const key = name + version + ip + port; // Uniques key to identify the service

        if (!this.services[key]) {
            this.services[key] = {};
            this.services[key].timestamp = Math.floor(new Date() / 1000);
            this.services[key].ip = ip;
            this.services[key].name = name;
            this.services[key].version = version;
            this.services[key].port = port;
            this.log.debug(`Added services ${name}, version ${version} at port ${ip}:${port}`);
            return key;
        }
        this.services[key].timestamp = Math.floor(new Date() / 1000); // if we already have service register then update timestamp
        this.log.debug(`Updated services ${name}, version ${version} at port ${ip}:${port}`);
    }

    unregister(name, version, ip, port) {
        const key = name + version + ip + port;
        delete this.services[key];
        return key;

    }
    // remove the expired service if we do not hear from them for more than 60 seconds
    cleanup() {
        const now = Math.floor(new Date() / 1000);
        Object.keys(this.services).forEach((key) => {
            if (this.services[key].timestamp + this.timeout < now) {
                delete this.services[key];
                this.log.debug(`Removed service ${key}`);
            }
        });
    }

}
module.exports = ServiceRegistry;