const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/api/photos')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


router.post('/', ensureLoggedIn, photosCtrl.create); 
