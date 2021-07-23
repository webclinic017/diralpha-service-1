/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

const faker = require('faker');

const users = [{
  email: faker.internet.email(),
  password: bcrypt.hashSync(faker.internet.password(), 10),
  last_login: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
},
{
  email: faker.internet.email(),
  password: bcrypt.hashSync(faker.internet.password(), 10),
  last_login: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
}];

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', users, {}),
  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;

    return queryInterface.bulkDelete('Users', null, {});
  },
};
