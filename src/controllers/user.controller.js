const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser(displayName, email, password, image);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};