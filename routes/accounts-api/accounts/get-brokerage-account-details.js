const express = require('express');

const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.get('/:accountId', accountsController.getAccountDetails);

module.exports = router;
