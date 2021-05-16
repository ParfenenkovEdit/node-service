const router = require('express').Router();
const boardService = require('./board.service');
const Column = require('../columns/column.model');

router.use((req, res, next) => {
  res.set('json');
  next();
});

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    return res.json(boards);
  } catch (err) {
    throw new Error(err.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const board = await boardService.getById(id);

  if (board) {
    return res.status(200).json(board);
  }

  return res.status(404).json({});
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  let convertedColumns = [];

  if (!title) {
    return res.status(400).send('Title is required');
  }

  if (columns && Array.isArray(columns)) {
    convertedColumns = columns.map(column => {
        const { title, order } = column;
        return new Column({ title, order });
    });
  }

  const board = await boardService.createBoard({ title, columns: convertedColumns });
  return res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;

  const board = await boardService.updateBoard( id, { title, columns });
  return res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardService.deleteBoard(id);
  return res.status(204).json({});
});

module.exports = router;
