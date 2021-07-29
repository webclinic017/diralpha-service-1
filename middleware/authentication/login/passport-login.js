/**
 * DEPRECATED. Might find use one day if we decide to use passport. 07/29/2021 - RAHUL.
 */

const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../../models');

const invalidLoginMessage = 'Wrong Email or Password';
const successfulLoginMessage = 'Login Successfull';

const findUser = async (emailAddress, password, done) => {
  const user = await User.findOne({ emailAddress }).catch((error) => console.log('login authentication error: ', error));

  if (!user) {
    return done(null, false, { message: invalidLoginMessage });
  }

  const validate = await user.isValidPassword(password);

  if (!validate) {
    return done(null, false, { message: invalidLoginMessage });
  }

  return done(null, user, { message: successfulLoginMessage });
};

const login = new LocalStrategy(
  {
    usernameField: 'email_address',
    passwordField: 'password',
  },
  findUser,
);

module.exports = login;
