const express = require('express');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const router = express.Router();

router.post('/register', accountsController.register);

module.exports = router;
