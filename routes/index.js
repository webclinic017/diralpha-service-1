const router = require('express').Router();

const { expressJwtAuth, handleInvalidAuthError } = require('../middleware/authorization/jwt-authorization');
const attachCurrentUser = require('../middleware/authorization/attach-current-user');

// signup/login endpoint must be ahead of authorization middleware
router.use('/v1', require('./authentication'));

// authorization and other middleware
router.use('/v1', expressJwtAuth);
router.use(handleInvalidAuthError);
router.use('/v1', attachCurrentUser);

// apis
router.use('/v1', require('./accounts-api'));

module.exports = router;
