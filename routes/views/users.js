var keystone = require('keystone'),
User = keystone.list('User');

exports = module.exports = function(req, res) {
   var view = new keystone.View(req, res);
   var locals = res.locals;
   view.on('post', { action: 'register' }, function(next) {
      console.log("Body");

      var newUser = new User.model({
         name: { first: req.body.name },
         email: req.body.email,
         phone: req.body.phone,
         password: req.body.password,
      });

      newUser.save(function(err) {
         console.log("Error",err);
         if (err) {
            return res.json(500,{error: err});
         }
         return res.redirect("/");
         next();
      });
   });

   view.on('post', { action: 'login' }, function(next) {
      signin(req, res);
   });
   // create a route that handles signin
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
   view.on('get', { action: 'signout' }, function(next) {
      console.log(req.body);
      signout(req, res);
   });
   // you'll want one for signout too
   function signout(req, res) {
      keystone.session.signout(req, res, function() {
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
