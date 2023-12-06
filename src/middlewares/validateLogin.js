const { userService } = require('../services');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { data } = await userService.getUserByEmail(email);
  if (!data || data.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = validateLogin;