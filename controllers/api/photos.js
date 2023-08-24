const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const router = express.Router();

// Configure AWS SDK with your credentials and bucket information
aws.config.update({
  accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.AWS_REGION,
});

const s3 = new aws.S3();

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

// Define the route for photo upload
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    const { originalname, buffer } = req.file;

    // Generate a unique filename for the uploaded photo
    const filename = `${Date.now()}-${originalname}`;

    // Upload the photo to the S3 bucket
    const params = {
      Bucket: import.meta.env.S3_BUCKET_NAME,
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
      uploadedBy: req.user._id, 
    });

    await newPhoto.save();
    console.log('Saved in the database:', newPhoto);


    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo' });
  }
});

module.exports = router;
