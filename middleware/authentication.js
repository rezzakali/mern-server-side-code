const User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).send('No token');
    } else {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      const finalUser = await User.findOne({
        _id: verifyToken._id,
        'tokens.token': token,
      });
      if (!finalUser) {
        res.status(401).send('User not found!');
      } else {
        res.status(200).send('Authorized User');
      }
    }
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = authentication;
