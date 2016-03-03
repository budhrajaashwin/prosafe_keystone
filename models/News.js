var keystone = require('keystone');
var Types = keystone.Field.Types;

var News = new keystone.List('News',{
  map: {name: 'Heading' },
  autokey: { from: 'Heading', path: 'key', unique: true},
});

News.add({
  Heading: {type: String, required: true, default: ''},
  image: {type: Types.CloudinaryImage},
  details: {type: String, required: true, default: 'So, whats new?'}
});

News.register();
