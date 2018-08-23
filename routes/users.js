var express = require('express');
var router = express.Router();
const request = require('request');
const bcrypt = require('bcrypt')
const passport = require('passport');

const usersController = require('../controllers/users.js');

router.get('/avatar/:id', usersController.getAvatar)

router.get('/find/:id', usersController.findUser);

router.get('/find/username/:username', usersController.findUsername);

router.get('/get/username/:username', usersController.findUsername);

router.get('/activate/:userId/:code', usersController.activate);

router.get('/loginhistory', passport.authenticate('jwt', { session: false }), usersController.getLoginHistory);

router.post('/register', usersController.register);

router.post('/forget/send', usersController.sendForget);

router.put('/:id/avatar', usersController.uploadAvatar);

router.put('edit/:userId', passport.authenticate('jwt', { session: false }), usersController.editUser);


module.exports = router;
