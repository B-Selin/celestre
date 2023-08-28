// Require express router  
const router = express.Router();

// Require user controller functions
const usersCtrl = require('../../controllers/api/users')

// Require logged in middleware
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users - Create a new user
router.post('/', usersCtrl.create);

// POST /api/users/login - Authenticate user
router.post('/login', usersCtrl.login)

// GET /api/users/check-token - Verify JWT
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken); 

// Export router
module.exports = router;