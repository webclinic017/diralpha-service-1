/* eslint-disable max-len */
const accountCreationService = require('../../services/accounts-api/accounts/account-creation-service');

const accountCreationController = {

  /**
   * Entry point for handling an incoming request from the account creation endpoint
   * @param {Express Request} req the incoming HTTP request
   * @param {Express Response} res the HTTP response object used to service the request
   */
  async register(req, res) {
    const accountObject = req.body;

    const response = await accountCreationService.createBrokerageAccount(accountObject);

    res.json(response);
  },

};

module.exports = accountCreationController;
