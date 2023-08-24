const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
