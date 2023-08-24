
const express = require('express');
const multer = require('multer');
const router = express.Router();
const photosController = require('../../controllers/api/photos');
const ensureLoggedIn = require('../../config/ensureLoggedIn')



// Define the route for photo upload
router.post('/upload', upload.single('photo'),ensureLoggedIn, photosController.uploadPhoto);


module.exports = router;
