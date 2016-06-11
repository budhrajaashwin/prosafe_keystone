var keystone = require('keystone');
var Types = keystone.Field.Types;

var Guidelines = new keystone.List('Guidelines',{
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true }
});

Guidelines.add({
	title: { type:String , required: true, default: ''},
	guideline: { type: Types.LocalFile, allowedTypes: ['application/pdf'],
		// dest: '/ProsafeData/files',
		dest: '/Users/abhimediratta/Nebulae/prosafeData/files',
		filename: function(item, file){
			return 'ProsafeGuideline_' + item.title + '.' + file.extension
		}
	}
});

Guidelines.register();
