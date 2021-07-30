const jwt = require('jsonwebtoken');

const jwtService = {

  generateToken(user) {
    const data = {
      id: user.id,
      emailAddress: user.emailAddress,
    };

    const signature = process.env.ACCESS_TOKEN_KEY;
    const expiration = parseInt(process.env.ACCESS_TOKEN_TTL, 10);

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  },
};

module.exports = jwtService;
