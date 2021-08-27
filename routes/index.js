const router = require('express').Router();

const { expressJwtAuth, handleInvalidAuthError } = require('../middleware/authorization/jwt-authorization');
const attachCurrentUser = require('../middleware/authorization/attach-current-user');

// signup/login endpoint must be ahead of authorization middleware
router.use('/', require('./authentication'));

router.use('/', expressJwtAuth);
router.use(handleInvalidAuthError);
router.use('/', attachCurrentUser);

router.use('/', require('./accounts-api'));
router.use('/', require('./trading-api'));
router.use('/', require('./data-streaming-api'));

module.exports = router;
