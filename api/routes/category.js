const express = require('express');
const router = express.Router();
const { allCategoryData } = require('../handlers/category');

// Get all category data
router.get('/', allCategoryData);

module.exports = router;