var express = require('express');
var router = express.Router();


var Nexmo = require('nexmo');
var nexmo = new Nexmo({
    apiKey: "048749df",
    apiSecret: "a58374589977f4f0",
});

var flag;

var UNIQUE_ID_FROM_VERIFICATION_REQUEST;
/* GET home page. */
router.get('/', function(req, res) {
  UNIQUE_ID_FROM_VERIFICATION_REQUEST = req.query.valid;
  console.log("otp is: " + UNIQUE_ID_FROM_VERIFICATION_REQUEST);
  res.render('confirm_otp');
});

router.post('/', function(req, res){
	console.log("post2 request received");
	var code_from_user = req.body.otp_entered;


	nexmo.verify.check({request_id: UNIQUE_ID_FROM_VERIFICATION_REQUEST, code: code_from_user},
		function(err, result){
			if(err){
				console.log(err);
				flag = result.status;
				console.log("The FLAG on confirm_otp page: " + flag);
				res.redirect('/confirmation?valid=' + flag );
			}else{
				console.log(result);
				console.log(result.status);
				flag = result.status;
				console.log("The FLAG on confirm_otp page: " + flag);
				res.redirect('/confirmation?valid=' + flag );
			}
		}
	);

})
module.exports = router;
