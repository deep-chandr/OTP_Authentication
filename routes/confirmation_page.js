var express = require('express');
var router = express.Router();

var flag;
/* GET home page. */
router.get('/', function(req, res) {
	flag = req.query.valid;


	console.log("The FLAG on confirmation_page : " + flag);
  	res.render('confirmation_page', {flag});
});

module.exports = router;
