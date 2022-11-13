const express = require('express');
const router = express.Router();
const assets = require('../controllers/assetsController');

router.get('/risks', assets.getRisks)
router.get('/returnRates', assets.getReturnRates)

module.exports = router;
