const router = require('express').Router({ mergeParams: true });
const taskServices = require('./task.service');

router.use((req, res, next) => {
  res.set('json');
  next();
});

router.route('/').get(async (req, res) => {

  const { boardId } = req.params;

  try {
    const tasks = await taskServices.getAll(boardId);

    if (tasks) {
      return res.status(200).json(tasks);
    }

    return res.status(404);
    
  } catch (err) {
    throw new Error(err.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;

  const task = await taskServices.getById(boardId, taskId);

  if (task) {
    return res.status(200).json(task);
  }

  return res.status(404).json({});
});

router.route('/').post(async (req, res) => {

  const { title, order, description, userId, boardId, columnId } = req.body;

  const task = await taskServices.createTask({ title, order, description, userId, boardId: boardId || req.params.boardId, columnId });
  return res.status(201).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const { taskId } = req.params;

  const { title, order, description, userId, boardId, columnId } = req.body;

  const task = await taskServices.updateTask( taskId, { title, order, description, userId, boardId: boardId || req.params.boardId, columnId });
  return res.status(200).json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const { taskId } = req.params;
  await taskServices.deleteTask(taskId);
  return res.status(204).json({});
});

module.exports = router;
