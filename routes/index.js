var express = require('express');
var router = express.Router();
const { loggedIn, notLoggedIn } = require('../middlewareForAuth/middlewareAuth')

// GET index page.:
router.get('/', loggedIn, function(req, res, next) {
  res.render('index', { title: 'Time2Fit' });
});



module.exports = router;
