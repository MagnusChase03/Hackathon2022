const express = require('express');
const router = express.Router();
const assets = require('../controllers/assetsController');

router.get('/', assets.getAssets)

module.exports = router;
