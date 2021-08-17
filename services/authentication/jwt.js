const jwt = require('jsonwebtoken');

const jwtService = {

  generateBearerToken(user) {
    const data = {
      id: user.id,
      emailAddress: user.emailAddress,
      timestamp: Date.now(),
    };

    const signature = process.env.ACCESS_TOKEN_KEY;
    const expiration = parseInt(process.env.ACCESS_TOKEN_TTL, 10);

    const token = jwt.sign({ data }, signature, { expiresIn: expiration });

    return `Bearer ${token}`;
  },
};

module.exports = jwtService;
