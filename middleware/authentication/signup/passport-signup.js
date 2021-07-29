/**
 * DEPRECATED. Might find use one day if we decide to use passport. 07/29/2021 - RAHUL.
 */

const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../../models');

const signup = new LocalStrategy(
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

module.exports = signup;
