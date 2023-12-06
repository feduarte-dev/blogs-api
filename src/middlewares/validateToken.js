const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
    
  try {
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    } 
    return res.status(500).json({ message: error.message });
  }

  next();
};

module.exports = validateToken;