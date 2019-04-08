const express = require('express');
const router = express.Router();
const { allSubCategories, insertNewSubCategory, selectSpecificSubCategory, updateSpecificSubCategory, deleteSubCategory } = require('../handlers/subcategory');

router.get('/', allSubCategories);
router.get('/:id', selectSpecificSubCategory);
router.post('/', insertNewSubCategory);
router.put('/:id', updateSpecificSubCategory);
router.delete('/', deleteSubCategory);

module.exports = router;