var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'products';

	// Load the galleries by sortOrder
	view.query('products', keystone.list('Products').model.find().populate('categories').sort('sortOrder'));
	view.query('categories', keystone.list('ProductsCategory').model.find().sort('sortOrder'));

	// Render the view
	view.render('products');

};
