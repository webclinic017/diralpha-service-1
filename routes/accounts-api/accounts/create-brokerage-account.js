const express = require('express');
const accountCreationController = require('../../../controllers/accounts/account-creation-controller');

const router = express.Router();

router.post('/register', accountCreationController.register);

module.exports = router;
