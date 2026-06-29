import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort('name');
  res.json(categories);
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json(category);
};
