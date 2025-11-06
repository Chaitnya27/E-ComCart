const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 }, 
  description: { type: String,required:true}, 
  imageUrl: { type: String, required: true},
});

module.exports = mongoose.model('Product', ProductSchema);