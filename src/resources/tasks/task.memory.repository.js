const Task = require('./task.model');
const DB = require('../../utils/inMemoryDb');

const TABLE_NAME = 'Tasks';


const getAll = async (boardId) => {
  const tasks = await DB.getAllEntities(TABLE_NAME);
  return tasks.filter(task => task.boardId === boardId);
};

const getById = async (boardId, taskId) => {
  try {
    const tasks = await getAll(boardId);
    return tasks.find(task => task.id === taskId);
  } catch(err) {
    throw new Error(err.message);
  }
};

const createTask = async ({ title, order, description, userId, boardId, columnId }) => {
  try {
    const task = new Task({ title, order, description, userId, boardId, columnId });
    await DB.saveEntity(TABLE_NAME, task);
    return task;
  } catch(err) {
    throw new Error(err.message);
  }
}

const updateTask = async (id, entity) => {
  try {
    const updatedTask = await DB.updateEntity(TABLE_NAME, id, entity);
    return updatedTask;
  } catch(err) {
    throw new Error(err.message);
  }
}

const deleteTask = async (id) => {
  try {
    await DB.removeEntity(TABLE_NAME, id);
    return;
  } catch(err) {
    throw new Error(err.message);
  }
}

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
