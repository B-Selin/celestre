
const aws = require('aws-sdk');
const Photo = require('../models/photo'); // Import your Photo model



module.exports = {
  uploadPhoto,
};


// Configure AWS SDK with your credentials and bucket information
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

// Controller method to handle photo uploads
const uploadPhoto = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    const { originalname, buffer } = req.file;

    // Generate a unique filename for the uploaded photo
    const filename = `${Date.now()}-${originalname}`;

    // Upload the photo to the S3 bucket
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
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

    await newPhoto.save();
    console.log('Saved in the database:', newPhoto);

    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo' });
  }
};


