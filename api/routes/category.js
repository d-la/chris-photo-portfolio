const express = require('express');
const router = express.Router();
const { allCategoryData, insertCategory } = require('../handlers/category');

// Get all category data
router.get('/', allCategoryData);
router.post('/', insertCategory);

module.exports = router;