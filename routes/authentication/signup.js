const express = require('express');
const authenticationController = require('../../controllers/authentication');

const authValidation = require('../../middleware/validation/authentication/validate-auth-request');

const router = express.Router();

// Checks if HTTP request has valid body formatting
router.use('/', authValidation.validate);

// Handles creating new account for user and sending appropriate response
router.post('/', authenticationController.signup);

module.exports = router;
