var keystone = require('keystone');
var Types = keystone.Field.Types;

var Products = new keystone.List('Products',{
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true }
});

Products.add({
  title: { type:String , required: true, default: ''},
  image: { type: Types.CloudinaryImage },
  details: { type:String}
});

Products.register();
