/* eslint-disable max-len */
const express = require('express');
const accountUpdateRequestValidation = require('../../../middleware/validation/accounts/validate-account-update-request');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.use('/:accountId', accountUpdateRequestValidation.validate);
router.patch('/:accountId', accountsController.updateAccountDetails);

module.exports = router;
