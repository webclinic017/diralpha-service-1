const router = require('express').Router();

const { expressJwtAuth, handleInvalidAuthError } = require('../middleware/authorization/jwt-authorization');
const attachCurrentUser = require('../middleware/authorization/attach-current-user');

// signup/login endpoint must be ahead of authorization middleware
router.use('/', require('./authentication'));

// authorization and other middleware
router.use('/', expressJwtAuth);
router.use(handleInvalidAuthError);
router.use('/', attachCurrentUser);

// apis
router.use('/', require('./accounts-api'));

module.exports = router;
