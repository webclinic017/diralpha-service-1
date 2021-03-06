/* eslint-disable max-len */
const { BrokerageAccount } = require('../../../models');

const alpacaAccountDeletionGateway = require('../../../alpaca-gateway/broker/accounts/account-deletion-gateway');

const accountDeletionService = {

  async deleteBrokerageAccount(currentUser, accountId) {
    let account;

    try {
      account = await BrokerageAccount.findOne({ where: { id: accountId, UserId: currentUser.dataValues.id } });
    } catch (error) {
      return {
        success: false,
        timestamp: new Date(),
        message: error,
      };
    }

    let response;

    if (account !== null) {
      const { alpacaAccountId } = account;

      const alpacaResponse = await alpacaAccountDeletionGateway.deleteAlpacaBrokerageAccount(alpacaAccountId);

      if (alpacaResponse.success) {
        // update status to closed instead of deleting row
        account.update({ status: 'ACCOUNT_CLOSED' });

        response = {
          success: true,
          timestamp: new Date(),
          message: `Account ${accountId} successfully closed`,
        };
      } else {
        response = {
          success: false,
          timestamp: new Date(),
          message: 'Alpaca ERROR: Account could not be closed.',
          error: alpacaResponse.message,
        };
      }
    } else {
      response = {
        success: false,
        timestamp: new Date(),
        message: `Account ${accountId} for user ${currentUser.dataValues.emailAddress} could not be found`,
      };
    }

    return response;
  },
};

module.exports = accountDeletionService;
