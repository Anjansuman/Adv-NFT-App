import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// File upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Single file
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'pinata_api_key': process.env.PINATA_API_KEY,
          'pinata_secret_api_key': process.env.PINATA_SECRET_KEY
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    // Success response
    res.json({
      success: true,
      cid: response.data.IpfsHash,
      url: `https://ipfs.io/ipfs/${response.data.IpfsHash}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      error: 'Failed to upload to IPFS',
      details: error
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Upload endpoint: POST /upload');
});