var keystone = require('keystone'),
User = keystone.list('User');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
	var locals = res.locals;
  view.on('post', { action: 'register' }, function(next) {
    console.log("in Post", req);

    var newUser = new User.model({
      name: { first: req.body.name },
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    newUser.save(function(err) {
      console.log("Error",err);
      if (err) {
        // return res.json(500,{error: err});
      }

      // res.json(200, {});  // post has been saved
      return res.redirect("/");
      locals.user.name;
      next();
    });

  });

  view.on('post', { action: 'login' }, function(next) {
    console.log(req.body);
    signin(req, res);
  });


  // create a route that handles signin

  function signin(req, res) {

    if (!req.body.email || !req.body.password) return res.json({ success: false });

    keystone.list('User').model.findOne({ email: req.body.email }).exec(function(err, user) {

      if (err || !user) {
        return res.json({
          success: false,
          session: false,
          message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
        });
      }

      keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
        // return res.json({
        //   success: true,
        //   session: true,
        //   date: new Date().getTime(),
        //   userId: user.id
        // });

        return res.redirect("/");

      }, function(err) {

        return res.json({
          success: true,
          session: false,
          message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
        });

      });

    });
  }

  view.on('get', { action: 'signout' }, function(next) {
    console.log(req.body);
    signout(req, res);
  });

  // you'll want one for signout too
  function signout(req, res) {
    keystone.session.signout(req, res, function() {
      // res.json({ 'signedout': true });
      return res.redirect("/");
    })};

  // also create some middleware that checks the current user

  // as long as you're using Keystone's session management, the user
  // will already be loaded if there is a valid current session

  function checkAuth(req, res, next) {
    // you could check user permissions here too
    if (req.user) return next();
    return res.status(403).json({ 'error': 'no access' });
  }

  // add an API endpoint for signing in _before_ your protected routes


  // then bind that middleware in your routes before any paths
  // that should be protected



  view.render('main/home');


};

// var keystone = require('keystone');
// var User = keystone.list('User');
//
// exports = module.exports = function(req, res) {
//
// 	var view = new keystone.View(req, res);
// 	var locals = res.locals;
//
// 	// Set locals
// 	locals.section = 'users';
// 	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
// 	locals.formData = req.body || {};
// 	locals.validationErrors = {};
// 	locals.enquirySubmitted = false;
//
// 	// On POST requests, add the Enquiry item to the database
// 	view.on('post', { action: 'users' }, function(next) {
//
// 		var newEnquiry = new Enquiry.model(),
// 			updater = newEnquiry.getUpdateHandler(req);
// 		console.log(req.body);
// 		updater.process(req.body, {
// 			flashErrors: true,
// 			fields: 'name, email, phone,password',
// 			errorMessage: 'There was a problem:'
// 		}, function(err) {
// 			if (err) {
// 				locals.validationErrors = err.errors;
// 			} else {
// 				locals.enquirySubmitted = true;
// 			}
// 			next();
// 		});
//
// 	});
//
// 	view.render('main/home');
//
// };
