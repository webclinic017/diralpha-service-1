const express = require('express');

const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.delete('/:accountId', accountsController.deleteAccount);

module.exports = router;
