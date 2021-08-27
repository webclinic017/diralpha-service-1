const express = require('express');
const accountValidation = require('../../../middleware/validation/accounts/validate-account-creation-request');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.use('/register', accountValidation.validate);
router.post('/register', accountsController.register);

module.exports = router;
