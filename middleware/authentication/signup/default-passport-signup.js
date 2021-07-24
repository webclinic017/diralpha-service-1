const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../../models');

const defaultSignup = new LocalStrategy(
  {
    usernameField: 'email_address',
    passwordField: 'password',
  },
  async (emailAddress, password, done) => {
    try {
      const lastLogin = new Date();
      const user = await User.create({ emailAddress, password, lastLogin });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

module.exports = defaultSignup;
