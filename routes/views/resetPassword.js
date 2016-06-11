var keystone = require('keystone'),
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.filters = {
		resetHash: req.params.resetHash
	};

  view.on('init', function(next) {
    keystone.list('users').model.findOne().where('resetHash', locals.filters.resetHash).exec(function(err, user) {
      if (err || !user) {
        req.flash('error', 'Unregistered user');
        return next();
      }
      locals.user = user;
      next();
    });
  });

  // Render the view
  view.render('main/resetPassword.jade', { layout: 'layouts/auth' });

};
