var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'guidelines';
	locals.filters = {
		id: req.params.id
	};

	locals.data = {};

	// Load the galleries by sortOrder
	// Load the current category filter
	view.on('init', function(next) {

		var q = keystone.list('Guidelines').model.find();
    q.exec(function(err, results) {
			locals.data.guidelines = results;
			next(err);
		});

	});
	// Render the view
	view.render('main/guidelines');

};
