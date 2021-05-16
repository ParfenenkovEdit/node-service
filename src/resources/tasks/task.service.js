const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const createTask = ({ title, order, description, userId, boardId, columnId }) => tasksRepo.createTask({ title, order, description, userId, boardId, columnId });

const updateTask = (id, { title, order, description, userId, boardId, columnId }) => tasksRepo.updateTask(id, { title, order, description, userId, boardId, columnId });

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
