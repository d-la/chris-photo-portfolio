const express = require('express');
const router = express.Router();
const { selectAllPhotos, insertPhoto } = require('../handlers/photo');

router.get('/', selectAllPhotos);
router.post('/', insertPhoto);

module.exports = router;