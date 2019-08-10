const express = require('express');

const router = express.Router();

module.exports = (param) => {
  const { tasks } = param;

  router.get('/', async (req, res) => {
    try {
      const tasksList = await tasks.getList();
      return res.render('task', {
        page: 'Task',
        tasksList,
        success: req.query.success,
      });
    } catch (err) {
      return err;
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const taskName = req.body.taskName.trim();
      const taskEstimation = req.body.taskEstimation.trim();
      const taskDescription = req.body.taskDescription.trim();
      const tasksList = await task.getList();
      if (!taskName || !taskEstimation || !taskDescription) {
        return res.render('task', {
          page: 'Task',
          error: true,
          taskName,
          taskEstimation,
          taskDescription,
          tasksList,
        });
      }
      await tasks.addTask(taskName, taskEstimation, taskDescription);
      return res.redirect('/task?success=true');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
