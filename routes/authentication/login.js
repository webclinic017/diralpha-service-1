require('../../middleware/authentication');
const express = require('express');
const { login } = require('../../middleware/authentication');

const router = express.Router();

router.post('/', login);

module.exports = router;
