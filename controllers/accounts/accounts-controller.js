const accountCreationService = require('../../services/accounts-api/accounts/account-creation-service');

const accountCreationController = {

  /**
   * Entry point for handling an incoming request from the account creation endpoint
   * @param {Express Request} req the incoming HTTP request
   * @param {Express Response} res the HTTP response object used to service the request
   */
  register(req, res) {
    const alpacaAccountObject = JSON.stringify(req.body);

    const { response, error } = accountCreationService.createBrokerageAccount(alpacaAccountObject);

    if (!error) {
      res.json(response);
    } else {
      res.status(422).json(error);
    }
  },

};

module.exports = accountCreationController;
