const express = require('express');
const router = express.Router();
const { allSubCategories, insertNewSubCategory, selectSpecificSubCategory } = require('../handlers/subcategory');

router.get('/', allSubCategories);
router.get('/:id', selectSpecificSubCategory);
router.post('/', insertNewSubCategory);

module.exports = router;