// const signup = require('./signup');
// const login = require('./login');

const { User } = require('../../models');

const isUniqueEmail = (emailAddress) => User.findOne({ where: { emailAddress } })
  .then((token) => token !== null)
  .then((isUnique) => isUnique);

const signUp = async (emailAddress, password) => {
  const isUnique = isUniqueEmail(emailAddress);
  if (!isUnique) {
    return {
      user: null,
      message: {
        content: 'Failed signup, this email address already exists.',
      },
    };
  }
  try {
    const lastLogin = new Date();
    const userRecord = await User.create({ emailAddress, password, lastLogin });

    return {
      user: {
        emailAddress: userRecord.emailAddress,
      },
      message: {
        content: 'Successful signup',
      },
    };
  } catch (error) {
    return {
      user: null,
      message: {
        content: `An error occured: ${error}`,
      },
    };
  }
};

module.exports = signUp;
// module.exports = { signup, login };
