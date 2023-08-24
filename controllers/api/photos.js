const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const Photo = require('../../models/photo'); // Import your Photo model

// Configure AWS SDK with your credentials and bucket information
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const myBucket = process.env.S3_BUCKET;

// Configure Multer to upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

const uploadPhoto = async (req, res) => {
  try {
    // Extract photo metadata, S3 URL, and user ID from req.body and req.file
    const { title, description, keywords } = req.body;
    const { location: s3Url } = req.file;
    const uploadedBy = req.user._id; 
    // Create a new Photo document
    const newPhoto = new Photo({
      title,
      description,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
      s3Url,
      uploadedBy,
    });

    // Save the new photo document to the database
    await newPhoto.save();

    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo' });
  }
};

module.exports = {
  upload,
  uploadPhoto,
};
