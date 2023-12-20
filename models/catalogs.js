const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , unique : true},
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
