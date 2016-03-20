var keystone = require('keystone');
var Types = keystone.Field.Types;

var Products = new keystone.List('Products',{
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true }
});

Products.add({
  title: { type:String , required: true, default: ''},
  image: { type: Types.CloudinaryImages },
  details: { type:Types.Textarea, initial:true },
	categories: { type: Types.Relationship, ref: 'ProductsCategory', many: true, initial:true }
});

Products.register();
