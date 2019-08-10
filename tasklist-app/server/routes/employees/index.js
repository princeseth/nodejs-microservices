const express = require('express');

const router = express.Router();

module.exports = (param) => {
  const { employees } = param;

  router.get('/', async (req, res) => {
    try {
      const promises = [];
      promises.push(employees.getList());
      promises.push(employees.getAllWork());

      const results = await Promise.all(promises);

      return res.render('employees', {
        page: 'All Employees',
        employeeslist: results[0],
        work: results[1],
      });
    } catch (err) {
      return err;
    }
  });

  router.get('/:name', async (req, res, next) => {
    try {
      const promises = [];
      promises.push(employees.getEmployee(req.params.name));
      promises.push(employees.getWorkForEmployee(req.params.name));
      const results = await Promise.all(promises);

      if (!results[0]) {
        return next();
      }

      return res.render('employees/detail', {
        page: req.params.name,
        employee: results[0],
        work: results[1],
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
