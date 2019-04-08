const express = require('express');
const router = express.Router();
const { allSubCategories, insertNewSubCategory, selectSpecificSubCategory, updateSpecificSubCategory } = require('../handlers/subcategory');

router.get('/', allSubCategories);
router.get('/:id', selectSpecificSubCategory);
router.post('/', insertNewSubCategory);
router.put('/:id', updateSpecificSubCategory);

module.exports = router;