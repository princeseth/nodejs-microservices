const fs = require('fs');
const util = require('util');

const axios = require('axios');

class EmployeeService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async getNames() {
        const { ip, port } = await this.getService('employees-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/names`
        });
    }

    async getList() {
        const { ip, port } = await this.getService('employees-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/list`
        });
    }

    async getEmployee(shortname) {
        const { ip, port } = await this.getService('employees-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/employees/${shortname}`
        });
    }

    async getWorkForEmployee(shortname) {
        const { ip, port } = await this.getService('employees-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/work/${shortname}`
        });
    }

    async getWorkList() {
        const { ip, port } = await this.getService('employees-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/work`
        });
    }
    async callService(requestOptions) {
        const response = await axios(requestOptions);
        return response.data;
    }

    async getService(servicename) {
        const response = await axios.get(`http://localhost:3000/find/${servicename}/1`);
        return response.data;
    }
}

module.exports = EmployeeService;