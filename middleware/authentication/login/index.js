const passport = require('passport');
const defaultLocalLoginStrategy = require('./default-passport-login');

passport.use(
  'login',
  defaultLocalLoginStrategy,
);
