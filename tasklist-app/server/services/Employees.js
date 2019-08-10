const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class EmployeeService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async getNames() {
        const data = await this.getData();
        return data.map(employee => ({
            name: employee.name,
            shortname: employee.shortname
        }));
    }

    async getList() {
        const data = await this.getData();
        return data.map(employee => ({
            name: employee.name,
            shortname: employee.shortname,
            title: employee.title,
            summary: employee.summary
        }));
    }

    async getAllWork() {
        const data = await this.getData();
        const work = data.reduce((acc, ele) => {
            if (ele.work) {
                acc = [...acc, ...ele.work];
            }
            return acc;
        }, []);
        return work;
    }

    async getEmployee(shortname) {
        const data = await this.getData();
        const employee = data.find(current => current.shortname === shortname);
        if (!employee) return null;
        return {
            title: employee.title,
            name: employee.name,
            shortname: employee.shortname,
            summary: employee.summary,
        };
    }

    async getWorkForEmployee(shortname) {
        const data = await this.getData();
        const employee = data.find(emp => emp.shortname === shortname);
        if (!employee || !employee.work) return null;
        return employee.work;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data).employees;
    }
}

module.exports = EmployeeService;