const express = require('express');
const router = express.Router();
const { insertContact } = require('../handlers/contact');

// Get all category data
router.post('/', insertContact);

module.exports = router;