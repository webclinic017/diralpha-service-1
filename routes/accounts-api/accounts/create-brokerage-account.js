const express = require('express');
const accountValidation = require('../../../middleware/validation/accounts/validate-account');
const accountsController = require('../../../controllers/accounts/accounts-controller');

const { expressJwtAuth, handleInvalidAuthError } = require('../../../middleware/authorization/jwt-auth');
const attachCurrentUser = require('../../../middleware/authorization/attach-current-user');

const router = express.Router();

router.use('/register', expressJwtAuth);
router.use(handleInvalidAuthError);
router.use('/register', attachCurrentUser);
router.use('/register', accountValidation.validate);
router.post('/register', accountsController.register);

module.exports = router;
