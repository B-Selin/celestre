// Require express router
const router = require('express').Router();

// Require stargazing controller functions
const stargazingCtrl = require('../../controllers/api/stargazings');  

// Require logged in middleware
const isLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/stargazings - Create a new stargazing entry
router.post('/', isLoggedIn, stargazingCtrl.create);

// GET /api/stargazings - Get all stargazing entries
router.get('/', isLoggedIn, stargazingCtrl.index);

// DELETE /api/stargazings/:id - Delete a stargazing entry
router.delete('/:id', isLoggedIn, stargazingCtrl.deleteOne);

// Export router
module.exports = router;