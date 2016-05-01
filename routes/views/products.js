var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'products';
	locals.filters = {
		id: req.params.id
	};

	locals.data = {};

	// Load the galleries by sortOrder
	// Load the current category filter
	view.on('init', function(next) {

		if (req.params.id) {
			console.log('result', req.params.id);
			keystone.list('Products').model.findById(locals.filters.id).exec(function(err, result) {
				console.log(result);
				locals.data.product = result;
				next();
			});
		} else {
			console.log('result not there');
			next();
		}

	});
	// Render the view
	view.render('main/productDetails');

};
