const express = require('express');
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const router = express.Router();
require('dotenv').config();

// Configure the AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload file to S3
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const params = {
    Bucket: BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: 'text/plain'
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// List files in S3
router.get('/files', async (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
    const files = data.Contents.map(file => ({
      fileName: file.Key,
      url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`
    }));
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete file from S3
router.delete('/delete/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
