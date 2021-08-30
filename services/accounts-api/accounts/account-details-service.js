/* eslint-disable max-len */
const { BrokerageAccount } = require('../../../models');

const alpacaAccountDetailsGateway = require('../../../alpaca-gateway/broker/accounts/account-details-gateway');

const accountDetailsService = {

  async getBrokerageAccountDetails(currentUser, accountId) {
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

      const alpacaResponse = await alpacaAccountDetailsGateway.getAlpacaBrokerageAccountDetails(alpacaAccountId);

      if (alpacaResponse.success) {
        response = {
          sucess: true,
          timestamp: new Date(),
          message: {
            local: account,
            alpaca: alpacaResponse.message,
          },
        };
      } else {
        response = {
          success: false,
          timestamp: new Date(),
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

module.exports = accountDetailsService;
