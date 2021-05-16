const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.use((req, res, next) => {
  res.set('json');
  next();
});

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    return res.json(users.map(User.toResponse));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (user) {
    return res.json(User.toResponse(user));
  }

  return res.status(404);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  if (!name || !login || !password) {
    return res.status(400).send('Name, login and password is required');
  }

  const user = await usersService.createUser({ name, login, password });
  return res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const user = await usersService.updateUser( id, { name, login, password });
  return res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  return res.status(204).json({});
});

module.exports = router;
