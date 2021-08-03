const express = require('express');
const authenticationController = require('../../controllers/authentication');

const authValidation = require('../../middleware/validation/authentication/validate-auth-request');

const router = express.Router();

router.use('/', authValidation.validate);
router.post('/', authenticationController.signup);

module.exports = router;
