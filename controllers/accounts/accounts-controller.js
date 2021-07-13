const accountsController = {

  register(req, res) {
    /* TODO:
        Need to check if user already has account registered. Users cannot multiple accounts
    */
    res.send(req.body);
  },

};

module.exports = accountsController;
