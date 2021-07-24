const router = require('express').Router();

router.use('/', require('./accounts-api'));
router.use('/', require('./authentication'));

module.exports = router;
