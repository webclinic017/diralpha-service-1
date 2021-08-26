/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'brokerage_accounts', // name of Source model
    'user_id', // name of the key we're adding
    {
      type: Sequelize.UUID,
      references: {
        model: 'users', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'brokerage_accounts', // name of Source model
    'user_id', // key we want to remove
  ),
};
