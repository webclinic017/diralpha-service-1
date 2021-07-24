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

const defaultLocalStrategy = new LocalStrategy(
  {
    usernameField: 'email_address',
    passwordField: 'password',
  },
  findUser,
);

module.exports = defaultLocalStrategy;
