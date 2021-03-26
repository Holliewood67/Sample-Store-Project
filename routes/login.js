const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post('/', passport.authenticate('localLogin', {
    successRedirect: '/account'
}))

module.exports = router;