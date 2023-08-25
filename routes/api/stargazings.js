const router = require('express').Router();
const stargazingCtrl = require('../../controllers/api/stargazings');
const express = require('express');
const isLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', isLoggedIn, stargazingCtrl.create);
router.get('/', isLoggedIn, stargazingCtrl.index);

module.exports = router;