const express = require('express');
const router = express.Router();
const { selectAllPhotos, insertPhoto, selectSpecificPhoto, updateSpecificPhoto, deletePhoto } = require('../handlers/photo');

router.get('/', selectAllPhotos);
router.post('/', insertPhoto);
router.get('/:id', selectSpecificPhoto);
router.put('/:id', updateSpecificPhoto);
router.delete('/', deletePhoto);

module.exports = router;