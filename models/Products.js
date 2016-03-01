var keystone = require('keystone'),
var Types = keystone.Field.Types;

var Products = new keystone.list('Products',{
	autokey: { from: 'name', path: 'key', unique: true }
});

Products.add({
  title: { type:String , required: true},
  image: { type: Types.CloudinaryImage },
  price: { type: String, required: true},
  details: { type:String}
});

Products.register();
