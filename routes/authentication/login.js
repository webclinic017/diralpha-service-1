const express = require('express');
const authenticationController = require('../../controllers/authentication');

const authValidation = require('../../middleware/validation/authentication/validate-auth-request');

const router = express.Router();

// Checks if HTTP request has correct body formattikng
router.use('/', authValidation.validate);

// Handles authenicating and sending response
router.post('/', authenticationController.login);

module.exports = router;
