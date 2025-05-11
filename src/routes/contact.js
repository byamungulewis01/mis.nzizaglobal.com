const express = require('express');
const { validate } = require('../validators/contact');
const contactController = require('../controllers/contact');

const router = express.Router();

router.post('/contact-request', validate, contactController.createContactRequest);

module.exports = router;