/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      queryInterface.createTable('brokerage_accounts', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        account_number: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
        },
        currency: {
          type: Sequelize.STRING,
        },
        first_name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        date_of_birth: {
          type: Sequelize.DATE,
        },
        tax_id: {
          type: Sequelize.STRING,
        },
        tax_id_type: {
          type: Sequelize.STRING,
        },
        country_of_citizenship: {
          type: Sequelize.STRING,
        },
        country_of_birth: {
          type: Sequelize.STRING,
        },
        country_of_tax_residence: {
          type: Sequelize.STRING,
        },
        funding_source: {
          type: Sequelize.STRING,
        },
        phone_number: {
          type: Sequelize.STRING,
        },
        street_address_line_one: {
          type: Sequelize.STRING,
        },
        street_address_line_two: {
          type: Sequelize.STRING,
        },
        city: {
          type: Sequelize.STRING,
        },
        state: {
          type: Sequelize.STRING,
        },
        postal_code: {
          type: Sequelize.STRING,
        },
        country: {
          type: Sequelize.STRING,
        },
        is_control_person: {
          type: Sequelize.BOOLEAN,
        },
        is_affiliated_exchange_or_finra: {
          type: Sequelize.BOOLEAN,
        },
        is_politically_exposed: {
          type: Sequelize.BOOLEAN,
        },
        immediate_family_exposed: {
          type: Sequelize.BOOLEAN,
        },
        trusted_contact_first_name: {
          type: Sequelize.STRING,
        },
        trusted_contact_last_name: {
          type: Sequelize.STRING,
        },
        trusted_contact_email_address: {
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('brokerage_accounts');
  },
};
