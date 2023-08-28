// Models
const Stargazing = require('../../models/stargazing'); 

// POST /api/stargazings - Create a new stargazing entry
async function create(req, res) {
  try {
    // Create a new stargazing document from request body
    // and current logged in user
    const stargazing = await Stargazing.create({
      date: req.body.date,  
      title: req.body.title,
      observations: req.body.observations,
      user: {
        // Get logged in user from request
        _id: req.user._id,
        name: req.user.name
      } 
    });

    // Send back the new stargazing document
    res.status(201).json(stargazing);
    
  } catch(err) {
    // Send back error response
    res.status(400).json(err); 
  }
}

// GET /api/stargazings - Get all stargazing entries
async function index(req, res) {
  try {
    // Find all stargazing documents and populate 
    // the 'user' field
    const stargazings = await Stargazing.find().populate('user').sort({date: -1});

    // Send back stargazing documents  
    res.json(stargazings);
    
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// DELETE /api/stargazings/:id - Delete a stargazing entry
async function deleteOne(req, res) {
  try {
    // Find stargazing document by id and delete
    const stargazing = await Stargazing.findByIdAndDelete(req.params.id);

    // Send 404 if no document found
    if(!stargazing) return res.status(404).json({error: 'Stargazing not found'});

    // Send back success response
    res.json({message: 'Stargazing deleted'});
    
  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = {
  create,
  index, 
  deleteOne
};
