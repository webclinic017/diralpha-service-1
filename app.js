const express = require('express');
const passport = require('passport');

const app = express();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

module.exports = app;
