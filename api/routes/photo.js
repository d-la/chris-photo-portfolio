const express = require('express');
const router = express.Router();
const { selectAllPhotos, insertPhoto, selectSpecificPhoto } = require('../handlers/photo');

router.get('/', selectAllPhotos);
router.post('/', insertPhoto);
router.get('/:id', selectSpecificPhoto);

module.exports = router;