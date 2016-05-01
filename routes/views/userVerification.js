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
      keystone.list('users').model.findOne().where('verificationHash', locals.filters.verificationHash).exec(function(err, result) {
        if (err || !result) {
          req.flash('error', 'Unregistered user');
          return next();
        }
        var user = result;
        user.verified = true;
        user.save().then(function (response) {
          console.log('verified user', user);
          return res.redirect("/keystone/signin");
        }).catch(function (err) {
          console.error(err);
          return next();
        })

      });
    } else {
      console.log('user not registered');
      next();
    }

  });

  // Render the view
  view.render('main/productDetails');

};
