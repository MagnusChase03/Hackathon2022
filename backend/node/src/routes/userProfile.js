const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userProfileSanatation = require('../middleware/userProfileSanatation');

router.get('/', userProfileSanatation.sanatizeGet, userProfileController.getUserProfile)
router.post('/', userProfileSanatation.sanatizePost, userProfileController.createUserProfile)

module.exports = router;
