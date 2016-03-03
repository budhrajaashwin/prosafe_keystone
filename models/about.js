var keystone = require('keystone');
var Types = keystone.Field.Types;

var About = new keystone.List('About', {
	autokey: { from: 'name', path: 'key', unique: true }
});

About.register();
