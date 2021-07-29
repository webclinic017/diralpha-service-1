/* eslint-disable camelcase */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const userData = require('../config/MOCK_USER_DATA.json');

const currentTime = new Date();
const mockUserDataWithLogins = userData.map((user) => ({
  email_address: user.email_address,
  password: bcrypt.hashSync(user.password, 10),
  last_login: currentTime,
  created_at: currentTime,
  updated_at: currentTime,
}));

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', mockUserDataWithLogins, {}),
  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    const emails = mockUserDataWithLogins.map(({ email_address }) => email_address);

    return queryInterface.bulkDelete('users', { email_address: { [Op.in]: emails } }, {});
  },
};
