const Photo = require('./models/Photo'); // Import your Photo model

const photosCtrl = {};
a
photosCtrl.create = async (req, res) => {
  try {
    const newPhoto = new Photo({
      filename: req.file.filename,
      keywords: req.body.keywords.split(',').map(keyword => keyword.trim()),
      title: req.body.title,
      description: req.body.description,
      uploadedBy: req.user._id
    });

    await newPhoto.save();

    res.status(201).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo' });
  }
};

module.exports = photosCtrl;
