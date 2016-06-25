var keystone = require('keystone'),
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;


  view.on('init', function(next) {
    keystone.list('User').model.findOne({ phone: req.body.phone, otp: req.body.otp }).exec(function(err, user) {
      if (err || !user) {
        return res.status(500).json({message: 'Wrong OTP, please check again'});
      }
      user.verified = true;
      user.save(function (err) {
        signin(req, res);
      });
    });
    // return res.status(200).json(obj)
  });

  // Render the view
  view.render('main/home');

  function signin(req, res) {
    if (!req.body.email || !req.body.password) {
      console.log("Please fill in the credentials to login");
      req.flash ('error', 'Please fill in the credentials to login');
      return res.redirect ("/");
    }
    keystone.list('User').model.findOne({ email: req.body.email }).exec(function(err, user) {
      if (err || !user) {
        console.log("User does not exist");
        req.flash ('error' , 'User does not exist');
        return res.redirect("/");
      }
      keystone.session.signin({ email: user.email, password: req.body.password}, req, res, function(user) {
        return res.redirect("/");
      }, function(err) {
        console.log("Wrong password");
        req.flash('error','wrong password');
        return res.redirect("/");
      });
    });
  }

};
