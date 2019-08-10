const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./config');
const Employees = require('./services/Employees');
const Tasks = require('./services/Tasks');
const routes = require('./routes')


const app = express();

const config = configs[app.get('env')];

const employees = new Employees(config.data.employees);
const tasks = new Tasks(config.data.tasks);

app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.set('views', path.join(__dirname, './views'));
app.locals.title = config.sitename;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use(async (req, res, next) => {
  try {
    const names = await employees.getNames();
    res.locals.employeeNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use('/', routes({
  employees,
  tasks,
}));

app.use((req, res, next) => next(createError(404, 'File not found')));

//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.render('error');
});

app.listen(3085);

module.exports = app;