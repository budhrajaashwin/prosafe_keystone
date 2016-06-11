var keystone = require('keystone'),
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;


  view.on('init', function(next) {
    keystone.list('users').model.findOne().where('resetHash', req.body.resetHash).exec(function(err, user) {
      if (err || !user) {
        req.flash('error', 'Unregistered user');
        return next();
      }
      user.password = req.body.password;
      user.save(function (err) {
        return res.redirect("/keystone/signin");
      });
    });
  });

  // Render the view
  view.render('main/productDetails');

};
