var keystone = require('keystone');
var request = require('request'),
		baseUrl = "http://alerts.sinfini.com/api/web2sms.php?",
		sinfiniKey = "A2a621be249ba1d91421bf1dc04bb275f",
		sender = "PROSAF",
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  function send_sms(smsObj) {
  	var url = baseUrl + "workingkey=" + sinfiniKey
  	+ "&to=" + smsObj.to
  	+ "&sender=" + sender
  	+ "&message=" + smsObj.body;
  	request.get({
  		url: url
  	}, function (error, response, body) {
  		if (error) {
  			console.error("[SmsService.send_sms] error", error);
  			return;
  		} else {
  			console.log("[SmsService.send_sms]", body);
  		}
  	});
  };
  view.on('init', function(next) {
    keystone.list('User').model.findOne({ phone: req.body.phone }).exec(function(err, user) {
      if (user) {
        send_sms({
          to: user.phone,
          body: "OTP:" + user.otp + " Please verify your phone number using this OTP"
        });
        return res.status(200).json({});
      }
    });
    // return res.status(200).json(obj)
  });

  // Render the view
  view.render('main/home');

};
