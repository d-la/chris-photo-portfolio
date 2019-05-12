const express = require('express');
const router = express.Router();
const { allSubCategories, insertNewSubCategory, selectSpecificSubCategory, updateSpecificSubCategory, deleteSubCategory, selectSubCategoriesFromCategory } = require('../handlers/subcategory');

router.get('/', allSubCategories);
router.get('/:id', selectSpecificSubCategory);
router.post('/', insertNewSubCategory);
router.put('/:id', updateSpecificSubCategory);
router.delete('/', deleteSubCategory);
router.get('/category/:id', selectSubCategoriesFromCategory);

module.exports = router;