const mainAccountsRouter = require('express').Router();

mainAccountsRouter.route('/register')
  .post(require('./create-brokerage-account'));

mainAccountsRouter.route('/:accountId')
  .delete(require('./delete-brokerage-account'));

mainAccountsRouter.route('/:accountId')
  .get(require('./get-brokerage-account-details'));

module.exports = mainAccountsRouter;
