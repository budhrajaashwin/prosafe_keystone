var keystone = require('keystone'),
exports = module.exports = function(req, res) {

   var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'userVerification';
	locals.filters = {
		verificationHash: req.params.verificationHash
	};

   view.on('init', function(next) {

		if (req.params.verificationHash) {
			console.log('result', req.params.verificationHash);
			keystone.list('users').model.findById(locals.filters.verificationHash).exec(function(err, result) {
				console.log(result);
				next();
			});
		} else {
			console.log('user not registered');
			next();
		}

	});

	// Render the view
	view.render('main/productDetails');

};
