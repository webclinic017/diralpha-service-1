/* eslint-disable consistent-return */
const jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
};

const expressJwtAuth = jwt({
  secret: process.env.ACCESS_TOKEN_KEY, // Has to be the same that we used to sign the JWT

  userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth/jwt:generateToken -> 'req.token'

  getToken: getTokenFromHeader, // A function to get the auth token from the request

  algorithms: ['HS256'],
});

const InvalidAuthErrorResponse = (message) => ({
  success: false,
  timestamp: Date.now(),
  message,
});

const handleInvalidAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send(InvalidAuthErrorResponse(err.message));
    return;
  }
  next();
};

module.exports = { expressJwtAuth, handleInvalidAuthError };
