var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'products';

	// Load the galleries by sortOrder
	view.query('products', keystone.list('Product').model.find().sort('sortOrder'));

	// Render the view
	view.render('product');

};
