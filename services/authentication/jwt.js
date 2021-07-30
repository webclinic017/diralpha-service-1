const jwt = require('jsonwebtoken');

const jwtService = {

  generateToken(user) {
    const data = {
      id: user.id,
      emailAddress: user.emailAddress,
    };

    const signature = process.env.JWT_SECRET_KEY;
    const expiration = process.env.JWT_EXPIRATION_TTL;

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  },
};

module.exports = jwtService;
