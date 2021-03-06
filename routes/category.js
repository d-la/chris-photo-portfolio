const express = require('express');
const router = express.Router();
const { allCategoryData, insertCategory, deleteCategory, getCategoryData, updateCategory, selectAssociatedCategoryData } = require('../handlers/category');

// Get all category data
router.get('/', allCategoryData);
router.get('/all/:id', selectAssociatedCategoryData);
router.post('/', insertCategory);
router.delete('/', deleteCategory);
router.get('/:id', getCategoryData);
router.put('/:id', updateCategory);

module.exports = router;