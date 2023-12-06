const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { status, data } = await userService.getUserByEmail(email);
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: { email, userId: data.dataValues.id } }, secret, jwtConfig);
    return res.status(status).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};