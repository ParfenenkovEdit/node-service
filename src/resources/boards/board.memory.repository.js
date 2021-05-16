const Board = require('./board.model')
const DB = require('../../utils/inMemoryDb');

const TABLE_NAME = 'Boards';


const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async (id) => {
  try {
    const board = await DB.getEntity(TABLE_NAME, id); 
    return board;
  } catch(err) {
    throw new Error(err.message);
  }
};

const createBoard = async ({ title, columns }) => {
  try {
    const board = new Board({ title, columns });
    await DB.saveEntity(TABLE_NAME, board);
    return board;
  } catch(err) {
    throw new Error(err.message);
  }
}

const updateBoard = async (id, entity) => {
  try {
    const updatedBoard = await DB.updateEntity(TABLE_NAME, id, entity);
    return updatedBoard;
  } catch(err) {
    throw new Error(err.message);
  }
}

const deleteBoard = async (id) => {
  try {
    await DB.removeEntity(TABLE_NAME, id);
    return;
  } catch(err) {
    throw new Error(err.message);
  }
}


module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
