require('../../middleware/authentication');
const express = require('express');

const signUp = require('../../middleware/authentication/index');

const router = express.Router();

router.post(
  '/',

  async (req, res) => {
    // console.log(req.body);
    const content = await signUp(req.body.emailAddress, req.body.password);
    console.log(content);
    res.json(content);
  },
);

module.exports = router;
