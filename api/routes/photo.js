const express = require('express');
const router = express.Router();
const { selectAllPhotos, insertPhoto, selectSpecificPhoto, updateSpecificPhoto } = require('../handlers/photo');

router.get('/', selectAllPhotos);
router.post('/', insertPhoto);
router.get('/:id', selectSpecificPhoto);
router.put('/:id', updateSpecificPhoto);

module.exports = router;