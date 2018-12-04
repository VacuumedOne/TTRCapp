var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/login/regster', function(req, res, next) {
  res.render('index', { title: 'UserRegister' });
});

module.exports = router;
