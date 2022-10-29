const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const loggerMiddleware = require('../middleware/logger');

router.get('/', loggerMiddleware.logger, indexController.getIndex)

module.exports = router;
