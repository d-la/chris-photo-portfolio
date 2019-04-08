const express = require('express');
const router = express.Router();
const { selectAllPhotos } = require('../handlers/photo');

router.get('/', selectAllPhotos);

module.exports = router;