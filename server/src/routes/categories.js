const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res, next) => {
  try { const cats = await Category.find().sort('name'); res.json(cats); } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) { next(err); }
});

module.exports = router;
