const mainAccountsAPIRouter = require('express').Router();

mainAccountsAPIRouter.use('/accounts', require('./accounts'));

module.exports = mainAccountsAPIRouter;
