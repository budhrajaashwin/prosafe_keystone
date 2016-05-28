var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
  var path = require('path');

	// Set locals
	locals.section = 'products';

	locals.data = {};

	// Load the galleries by sortOrder
	// Load the current category filter
	view.on('init', function(next) {
    console.log("path",req.query.path);
    return res.sendFile(req.query.path);
	});
	// Render the view
	view.render('main/productDetails');

};
