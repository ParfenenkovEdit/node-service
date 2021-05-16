const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const createBoard = ({ title, columns }) => boardsRepo.createBoard({ title, columns });

const updateBoard = (id, { title, columns }) => boardsRepo.updateBoard(id, { title, columns });

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
