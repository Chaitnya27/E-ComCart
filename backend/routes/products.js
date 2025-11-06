const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', async (req, res) => {
  const { name, price, quantity, description, imageUrl } = req.body;
  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const product = new Product({
      name,
      price,
      quantity: quantity || 0,
      description,
      imageUrl,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

//get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

//  update product
router.put('/:id', async (req, res) => {
  const { name, price, quantity, description, imageUrl } = req.body;
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, description, imageUrl },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

//  delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});



module.exports = router;