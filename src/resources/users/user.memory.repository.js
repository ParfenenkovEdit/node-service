const User = require('./user.model');
const DB = require('../../utils/inMemoryDb');

const TABLE_NAME = 'Users';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async (id) => {
  try {
    const user = await DB.getEntity(TABLE_NAME, id);
    return user;
  } catch(err) {
    throw new Error(err.message);
  }
};

const createUser = async ({ name, login, password }) => {
  try {
    const user = new User({ name, login, password });
    await DB.saveEntity(TABLE_NAME, user);
    return user;
  } catch(err) {
    throw new Error(err.message);
  }
}

const updateUser = async (id, entity) => {
  try {
    const updatedUser = await DB.updateEntity(TABLE_NAME, id, entity);
    return updatedUser;
  } catch(err) {
    throw new Error(err.message);
  }
}

const deleteUser = async (id) => {
  try {
    await DB.removeEntity(TABLE_NAME, id);
    return;
  } catch(err) {
    throw new Error(err.message);
  }
}


module.exports = { getAll, getById, createUser, updateUser, deleteUser };
