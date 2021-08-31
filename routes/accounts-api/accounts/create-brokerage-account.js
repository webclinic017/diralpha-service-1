const express = require('express');
const accountCreationRequestValidation = require('../../../middleware/validation/accounts/validate-account-creation-request');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.use('/register', accountCreationRequestValidation.validate);
router.post('/register', accountsController.register);

module.exports = router;
