const accountCreationGateway = require('../../alpaca-gateway/broker/accounts/account-creation-gateway');

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
    const response = accountCreationGateway.createAccount(res, req.body);

    response.then(
      (value) => {
        this.handleAlpacaResponse(req, res, value);
      },
      (error) => {
        this.handleAlpacaError(req, res, error);
      },
    );
  },

  // handleValidAlpacaResponse(routerReq, routerRes, alpacaRes) {

  // },

  // handleAlpacaError(routerReq, routerRes, alpacaRes) {

  // },

};

module.exports = accountCreationController;
