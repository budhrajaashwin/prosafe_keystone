var keystone = require('keystone'),
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;


  view.on('init', function(next) {
    keystone.list('User').model.findOne({ email: req.body.email }).exec(function(err, user) {
      if (err) {
        return res.json(500, {status: 0});
      }
      console.log('user', user);
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 10; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      user.resetHash = text;

      user.save(function (err) {
        new keystone.Email({
          templateName:'forgot'
        }).send({
          to:user.email,
          tags: 'Password reset',
          from: {
            name: 'Prosafe Living',
            email: 'prosafe.living@gmail.com'
          },
          subject: 'Reset Password',
          user: user,
        },function (response){
          console.log("UserEmail response", response);
        });

        return res.json(200, {status: 1});
      });
    });
  });

  // Render the view
  view.render('main/productDetails');

};
