const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  return res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  return res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.createUser({ name, login, password });
  return res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const user = await usersService.updateUser({ id, name, login, password});
  return res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  return res.status(204).send('deleted');
});

module.exports = router;
