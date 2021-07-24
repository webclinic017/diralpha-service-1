const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');

passport.use(
  'signup',
  new LocalStrategy(
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
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email_address',
      passwordField: 'password',
    },
    async (emailAddress, password, done) => {
      try {
        const user = await User.findOne({ emailAddress });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);
