const express = require('express');
const router = express.Router();
const { allCategoryData, insertCategory, deleteCategory } = require('../handlers/category');

// Get all category data
router.get('/', allCategoryData);
router.post('/', insertCategory);
router.delete('/', deleteCategory);

module.exports = router;