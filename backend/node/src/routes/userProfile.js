const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userProfileSanatation = require('../middleware/userProfileSanatation');

router.post('/', userProfileSanatation.sanatize, userProfileController.createUserProfile)

module.exports = router;
