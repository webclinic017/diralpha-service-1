/* eslint-disable max-len */
const accountCreationService = require('../../services/accounts-api/accounts/account-creation-service');
const accountDeletionService = require('../../services/accounts-api/accounts/account-deletion-service');
const accountDetailsService = require('../../services/accounts-api/accounts/account-details-service');
const accountUpdateService = require('../../services/accounts-api/accounts/account-update-service');

const accountCreationController = {

  /**
   * Entry point for handling an incoming request from the account creation endpoint
   * @param {Express Request} req the incoming HTTP request
   * @param {Express Response} res the HTTP response object used to service the request
   */
  async register(req, res) {
    const accountDataObject = req.body;
    const { currentUser } = req;
    const response = await accountCreationService.createBrokerageAccount(currentUser, accountDataObject);

    res.json(response);
  },

  async deleteAccount(req, res) {
    const { accountId } = req.params;
    const { currentUser } = req;

    const response = await accountDeletionService.deleteBrokerageAccount(currentUser, accountId);

    res.json(response);
  },

  async getAccountDetails(req, res) {
    const { accountId } = req.params;
    const { currentUser } = req;

    const response = await accountDetailsService.getBrokerageAccountDetails(currentUser, accountId);

    res.json(response);
  },

  async updateAccountDetails(req, res) {
    const { accountId } = req.params;
    const { currentUser } = req;
    const accountDataObject = req.body;

    const response = await accountUpdateService.updateBrokerageAccountDetails(currentUser, accountId, accountDataObject);

    res.json(response);
  },
};

module.exports = accountCreationController;
