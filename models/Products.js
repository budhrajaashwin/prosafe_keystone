var keystone = require('keystone');
var Types = keystone.Field.Types;

var Products = new keystone.List('Products',{
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true }
});

Products.add({
	title: { type:String , required: true, default: ''},
	image: { type: Types.CloudinaryImages },
	featured: {type: Boolean, default:false, initial: false},
	details: { type:Types.Textarea, initial:true },
	technical: { type:Types.Textarea, initial:true },
	categories: { type: Types.Relationship, ref: 'ProductsCategory', many: true, initial:true },
	guideline: { type: Types.LocalFile, allowedTypes: ['application/pdf'],
		dest: '/ProsafeData/files',
		filename: function(item, file){
			return 'ProsafeGuideline_' + item.title + '.' + file.extension
		}
	}
});

Products.register();
