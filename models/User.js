var keystone = require('keystone');
var Types = keystone.Field.Types;
var request = require('request'),
		baseUrl = "http://alerts.sinfini.com/api/web2sms.php?",
		sinfiniKey = "A2a621be249ba1d91421bf1dc04bb275f",
		sender = "PROSAF";

/**
* User Model
* ==========
*/

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	phone: {type: Types.Text, required: true, initial: false},
	password: { type: Types.Password, initial: true, required: true },
	verificationHash: {type: Types.Text, initial: false},
	otp: {type: Types.Text },
	resetHash: {type: Types.Text, initial: false},
	verified: {type: Types.Boolean, initial: false, default: false},
	createdAt: { type: Date, default: Date.now },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
* Relationships
*/

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
* Registration
*/

User.defaultColumns = 'name, email, isAdmin';

function generateCode(){
	return Math.floor(1000 + Math.random() * 9000)
};

function send_sms(smsObj) {
	var url = baseUrl + "workingkey=" + sinfiniKey
	+ "&to=" + smsObj.to
	+ "&sender=" + sender
	+ "&message=" + smsObj.body;
	console.log("URL: ", url);
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

User.schema.pre('save',function (next) {
	this.wasNew = this.isNew;
	if(this.isNew) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 10; i++ ) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		this.verificationHash = text;
		this.otp = generateCode();
	}
	next();
});

User.schema.post('save', function(user){

	if(this.wasNew){
		send_sms({
			to: this.phone,
			body: "OTP:" + this.otp + " Please verify your phone number using this OTP"
		});
		// console.log("Email",this.email);
		// new keystone.Email({
		// 	templateName:'verifyUser'
		// }).send({
		// 	to:user.email,
		// 	tags: 'Verification',
		// 	from: {
		// 		name: 'Prosafe Living',
		// 		email: 'prosafe.living@gmail.com'
		// 	},
		// 	subject: 'Please verify your account',
		// 	user: user,
		// },function (response){
		// 	console.log("UserEmail response", response);
		// });
	}
});


User.register();
