const express = require('express');
const router = express.Router();
const passport = require('passport');

const reportsController = require('../controllers/reports');

router.post('/new', passport.authenticate('jwt', { session: false }), reportsController.newReport);

module.exports = router;
