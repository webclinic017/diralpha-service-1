const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  createAccount(req, res) {
    // Sends a HTTP POST Request to Alpaca and captures the response
    // returns a promise which will be the response
    const response = alpacaAccountCreationGateway.createAccount(res, req.body);

    response.then((value) => accountCreationService.handleAlpacaValidResponse(req, res, value))
      .catch((error) => accountCreationService.handleAlpacaErrorResponse(req, res, error));
  },

  handleAlpacaValidResponse(req, res, value) {
    res.send(value);
  },

  handleAlpacaErrorResponse(req, res, error) {
    res.status(422).send(`Alpaca Status Code 422 Invalid Form, ERROR MESSAGE: ${error.message}`);
  },

};

module.exports = accountCreationService;
