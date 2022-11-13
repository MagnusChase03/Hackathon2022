const express = require('express');
const router = express.Router();
const teapotController = require('../controllers/teapotController');

router.get('/', teapotController.getTeapot);

module.exports = router;
