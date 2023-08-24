
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3')

const router = express.Router();
const photosController = require('../../controllers/api/photos');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

const upload = photosController.upload;


// Define the route for photo upload
router.post('/upload', upload.single('photo'),ensureLoggedIn, photosController.uploadPhoto);


module.exports = router;
