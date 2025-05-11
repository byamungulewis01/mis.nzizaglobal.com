const express = require('express');
const contactRoutes = require('./contact');
const notificationRoutes = require('./notification');

const router = express.Router();

router.use('/digsol', contactRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;