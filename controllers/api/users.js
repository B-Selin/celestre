// Import required modules
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const User = require('../../models/user') 

// Export controller functions
module.exports = {
  create,
  login,
  checkToken
};

// GET /api/users/check-token (verify JWT)
function checkToken(req, res) {
  // Log the user from the request
  console.log('req.user', req.user);
  
  // Send back token expiration
  res.json(req.exp);
}

// POST /api/users/signup (create user)
async function create(req, res) {
  try {
    // Create new user from request body
    const user = await User.create(req.body);
    
    // Generate JWT with user data
    const token = createJWT(user);

    // Send back token 
    res.json(token);
    
  } catch(err) {
    // Send error response
    res.status(400).json(err);
  }
}

// POST /api/users/login (authenticate user) 
async function login(req, res) {
  try {
    // Find user by email
    const user = await User.findOne({email: req.body.email});
    if(!user) throw new Error(); 

    // Compare hashed password 
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) throw new Error();

    // Create JWT if credentials match
    const token = createJWT(user);
    res.json(token);
    
  } catch(err) {
    // Send invalid credentials response
    res.status(400).json('Bad Credentials');
  }
}



/*--- Helper Functions --*/
// Helper to generate JWT from user document

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
