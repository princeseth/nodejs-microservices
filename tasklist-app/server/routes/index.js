const express = require('express');

const router = express.Router();

const employeesRoute = require('./employees');
const tasksRoute = require('./tasks');

module.exports = (param) => {
  const { employees } = param;

  // router.get('/images/:type/:file', async (req, res, next) => {
  //   try {
  //     const image = await speakers.getImage(`${req.params.type}/${req.params.file}`);
  //     return image.pipe(res);
  //   } catch (err) {
  //     return next(err);
  //   }
  // });

  router.get('/', async (req, res, next) => {
    try {
      const promises = [];
      promises.push(employees.getList());

      const results = await Promise.all(promises);

      return res.render('index', {
        page: 'Home',
        employeeslist: results[0],
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/employees', employeesRoute(param));
  router.use('/tasks', tasksRoute(param));

  return router;
};
