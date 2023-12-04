const { loginService } = require('../services');

const validateDisplayName = (displayName) => (!displayName || displayName.length < 8);
const validatePassword = (password) => (!password || password.length < 6);
const validateEmail = (email) => email.match(/[a-z0-9]+@[a-z]+.[a-z]{2,3}/);

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (validateDisplayName(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (validatePassword(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const user = await loginService.getByEmail(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  next();
};

module.exports = validateUser;