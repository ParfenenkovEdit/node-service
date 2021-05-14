const User = require('../models/user.model');

const users = [];

const getAll = async () => users;

const getById = async (userId) => {
  const candidate = await users.find(user => user.id === userId);
  return candidate;
};

const createUser = async ({ name, login, password }) => {
  const user = await new User({ name, login, password });
  users.push(user);
  return user;
}

const updateUser = async (omitObject) => {
  const userIndex = users.findIndex(user => user.id === omitObject.id);
  const updatedUser = await Object.assign(users[userIndex], omitObject);
  users[userIndex] = updatedUser;
  return updatedUser;
}

const deleteUser = async (userId) => {
  const deletedUser = await users.splice(users.findIndex(user => user.id === userId), 1);
  return deletedUser;
}


module.exports = { getAll, getById, createUser, updateUser, deleteUser };
