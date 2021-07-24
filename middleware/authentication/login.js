const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');

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
          return done(null, false, { message: 'Wrong Email or Password' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Email or Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);
