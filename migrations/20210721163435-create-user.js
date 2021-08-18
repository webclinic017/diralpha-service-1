/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        email_address: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            notEmpty: true,
            notNull: true,
            isEmail: true,
          },
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
        last_login: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },

      });
    }),
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
