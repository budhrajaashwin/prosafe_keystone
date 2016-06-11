// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Prosafe Living',
	'brand': 'Prosafe Living',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'proLayout',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'cookie secret': 'bbaisbfakbfiqibqnlqqwoerndslknv ',
	'user model': 'User',
	'cloudinary config': 'cloudinary://456526832957653:qnKaxhBS7htL6ySXIgGQxf8VTy8@djzfxtdtx',
	'mandrill api key': 'k71Up33LlL0rXUvoKb2Teg',
	'mandrill username':'abhimediratta@gmail.com',
	'signin logo': ['/template_assets/img/logo.jpg', 220, 150],
	'signin redirect': '/'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

//2. sending an email
//Note: the setup assumes that you have a template file called
//'enquiry-notification.{TEMPLATE_EXTENSION, e.g. .hbs, .jade}'
//in '/templates/emails'
// new keystone.Email('enquiry-notification').send({
//     subject: '',
//     to: 'ashwin25694@gmail.com',
//     fromName: 'Prosafe Living',
//     fromEmail: 'budhrajaashwin@gmail.com',
//     // other locals for the email template also go here
// }, function callback(response){
// 	console.log("Email response", response);
// });

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
	'products' : ['products', 'ProductsCategory'],
	'News': 'News'
});

keystone.set('port',8000);

// keystone.set('cloudinary config', 'cloudinary://456526832957653:qnKaxhBS7htL6ySXIgGQxf8VTy8@djzfxtdtx' );
// keystone.init({
// 	'cloudinary config': 'cloudinary://456526832957653:qnKaxhBS7htL6ySXIgGQxf8VTy8@djzfxtdtx'
// });


// Start Keystone to connect to your database and initialise the web server

keystone.start();
