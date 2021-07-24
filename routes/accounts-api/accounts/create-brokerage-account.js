const express = require('express');
const accountValidationMiddleware = require('../../../middleware/validation/accounts/account-validation');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.use('/register', accountValidationMiddleware.validate);

router.post('/register', accountsController.register);

module.exports = router;
