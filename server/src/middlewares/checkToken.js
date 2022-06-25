const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');

module.exports.checkAuth = async (req, res, next) => {
  const {headers: {authorization}} = req; // 'Bearer kj2hkh23k4jh23k4jh32kjh4kj2332k3j4hk23'
  if(authorization) {
    const [,accessToken] = authorization.split(' ');
  } else {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const {headers: {authorization}} = req; // 'Bearer kj2hkh23k4jh23k4jh32kjh4kj2332k3j4hk23'
  const [,accessToken] = authorization.split(' ');
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError());
  }
};
