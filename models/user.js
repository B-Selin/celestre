// Require Mongoose and bcrypt modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Set number of salt rounds for bcrypt 
const SALT_ROUNDS = 6; 

// Create schema for User model
const userSchema = new Schema({

  // User name (required)
  name: {type: String, required: true},

  // Unique, trimmed, lowercase email (required)
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },

  // Password (required)
  password: { 
    type: String,
    required: true
  }
  
}, {

  // Enable timestamps
  timestamps: true,

  // Remove password when converting to JSON
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }

});

// Hash password before saving document
userSchema.pre('save', async function(next) {
  
  // 'this' refers to the current document
  if (!this.isModified('password')) return next();

  // Generate a salt and hash the password
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  
});

// Create User model from schema
module.exports = mongoose.model('User', userSchema);
