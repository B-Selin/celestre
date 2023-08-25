const express = require('express');
const router = express.Router();
const journalEntriesCtrl = require('../../controllers/api/journalEntries');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newJournalEntry = new JournalEntry({
      user: req.user._id, 
      title,
      content,
    });
    console.log(req.user);

    await newJournalEntry.save();
    res.status(201).json(newJournalEntry);
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({ error: 'An error occurred while creating the journal entry' });
  }
});

module.exports = router;