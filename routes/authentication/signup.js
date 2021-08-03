const express = require('express');
const authenticationController = require('../../controllers/authentication');

const signupValidation = require('../../middleware/validation/authentication/validate-signup');

const router = express.Router();

router.use('/', signupValidation.validate);
router.post('/', authenticationController.signup);

module.exports = router;
