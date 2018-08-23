var express = require('express');
var router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth');

const User = require('../models/user');

// Email Login
router.post('/login/email', authController.emailLogin);

// Authentication the user
router.get('/user', passport.authenticate('jwt', {session: false}), authController.userAuth);

module.exports = router;