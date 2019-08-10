const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const wrtieFile = util.promisify(fs.writeFile);

class TaskService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async addTask(name, estimation, description) {
        const data = this.getData;
        data.unshift({ name, estimation, description });
        return wrtieFile(this.datafile, JSON.stringify(data));
    }

    async getList() {
        const data = this.getData();
        return data;
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
    }
}

module.exports = TaskService;