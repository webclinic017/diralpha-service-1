require('../../middleware/authentication');
const express = require('express');

const { signup } = require('../../middleware/authentication/index');

const router = express.Router();

router.post('/', signup);

module.exports = router;
