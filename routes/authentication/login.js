require('../../middleware/authentication');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('login', { session: false }),
  async (req, res) => {
    res.json({
      message: 'log in successful',
      user: req.user,
    });
  },
);

module.exports = router;
