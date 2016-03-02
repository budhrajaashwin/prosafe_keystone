var keystone = require ('keystone');

var ProductsCategory = new keystone.List('ProductsCategory',{
 map: { name: 'title' },
 autokey: { from: 'title', path: 'key', unique:true}
});

ProductsCategory.add({
	title: { type: String, required: true , default: '' }
});

ProductsCategory.relationship({ ref: 'Products', path: 'categories'});

ProductsCategory.register();
