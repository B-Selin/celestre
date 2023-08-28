// Require Mongoose module
const mongoose = require('mongoose'); 

// Create schema for stargazing model
const stargazingSchema = new mongoose.Schema({

  // String title (required)
  title: { type: String, required: true },
  
  // Date observed (default to current date)
  date: { type: Date, default: Date.now },

  // String observations (required)
  observations: { type: String, required: true },

  // Reference to User model (required)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  }

});

// Create Stargazing model from schema
module.exports = mongoose.model('Stargazing', stargazingSchema);
