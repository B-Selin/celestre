
const Photo = require('../../models/photo'); // Import your Photo model
// import multer
const multer = require('multer');
const multerS3 = require('multer-s3')
var AWS = require('aws-sdk')


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
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});


// Controller method to handle photo uploads
const uploadPhoto = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    const { originalname, buffer } = req.file;

    console.log('Received photo data:', { title, description, keywords, originalname });

    // Generate a unique filename for the uploaded photo
    const filename = `${Date.now()}-${originalname}`;

    // Upload the photo to the S3 bucket
    const params = {
      Bucket: myBucket,
      Key: filename,
      Body: buffer,
      ACL: 'public-read', // Make the photo accessible publicly
    };

    const data = await s3.upload(params).promise();

    // Create a new Photo document in the database
    const newPhoto = new Photo({
      filename: data.Key,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
      title,
      description,
      uploadedBy: req.user._id, // Make sure you have access to the user ID
    });

    console.log('Creating new photo:', newPhoto);

    await newPhoto.save();
    console.log('Saved in the database:', newPhoto);

    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo' });
  }
};

// To avoid "Cannot access 'uploadPhoto' before initialization" move this to bottom?

module.exports = {
  upload, 
  uploadPhoto,
};

