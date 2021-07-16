const accountCreationService = require('../../services/accounts-api/accounts/account-creation-service');

const accountCreationController = {

  /**
   * Entry point for handling an incoming request from the account creation endpoint
   * @param {Express Request} req the incoming HTTP request
   * @param {Express Response} res the HTTP response object used to service the request
   */
  register(req, res) {
    /* TODO:
        Need to check if user already has account registered. Users cannot multiple accounts
    */
    accountCreationService.createAccount(req, res);
  },

};

module.exports = accountCreationController;
