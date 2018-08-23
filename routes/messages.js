var express = require('express');
var router = express.Router();
const passport = require('passport');

const messagesController = require('../controllers/messages');

const User = require('../models/user');

router.post('/new', passport.authenticate('jwt', { session: false }), messagesController.newMessage);

router.get('/all/recieved', passport.authenticate('jwt', { session: false }), messagesController.getUserInbox);

router.get('/all/sent', passport.authenticate('jwt', { session: false }), messagesController.getUserSentbox);

router.get('/all/unread', passport.authenticate('jwt', { session: false }), messagesController.getUnseen);

router.put('/seen', passport.authenticate('jwt', { session: false }), messagesController.setSeen);

module.exports = router;
