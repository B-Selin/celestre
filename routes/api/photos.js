
const express = require('express');
const multer = require('multer');
const router = express.Router();
const photosController = require('../controllers/photos'); 
// Define the route for photo upload
router.post('/upload', upload.single('photo'), photosController.uploadPhoto);

module.exports = router;
