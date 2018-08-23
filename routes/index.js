var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/mail', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('forgetMail')
});

module.exports = router;
