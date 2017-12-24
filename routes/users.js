var express = require('express');
var router = express.Router();

var Nexmo = require('nexmo');
var nexmo = new Nexmo({
    apiKey: "048749df",
    apiSecret: "a58374589977f4f0",
});

var otpGenerator = require('otp-generator');
var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

var BRAND_NAME = "addictd";

router.get('/', function(req, res) {
	res.render('users');
});

router.post('/', function(req, res){
	//console.log("post request received");
	//console.log('youur otp is: '+ otp);
	console.log(req.body.mobile);
	var NEXMO_TO_NUMBER = req.body.mobile;



	var verifyRequestId = null; // use in the check process

	nexmo.verify.request({number: NEXMO_TO_NUMBER, brand: BRAND_NAME}, function(err, result) {
	  if(err) { console.error(err); }
	  else {
	    verifyRequestId = result.request_id;
	    console.log('request_id: ', verifyRequestId);
	    res.redirect('/confirm_otp?valid=' + verifyRequestId);
	  }
	});



	

  //nexmo.message.sendSms(sender, recipient, message, options, callback);
  //nexmo.message.sendSms( "NEXMO", recipient, message, callback);
})




module.exports = router;
