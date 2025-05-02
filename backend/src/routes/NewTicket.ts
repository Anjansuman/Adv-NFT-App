import { Router } from "express";
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

import { PinataUpload } from "../utils/PinataUpload";

const router = Router();

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
router.post('/', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }
  
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;
      const fileContentType = req.file.mimetype;

      const hash = await PinataUpload(fileBuffer, fileName, fileContentType);

      if(!hash) {
        res.status(500).json({
            message: "Internal Server Error!",
            type: "Pinata"
        });
        return;
      }

      // store the complete data in database and create token by using backend
  
      // Success response
      res.json({
        message: "Tickets created successfully!",
        hash: hash
    });
  
    } catch (error) {
      console.error('Upload Error:', error);
      res.status(500).json({
        error: 'Failed to upload to IPFS',
        message: "Internal server error"
      });
    }
  });

export default router;

/*

/backend => [file, name, price, total-supply, txn-signature]
  verify => all inputs [use zod]
  verify => txn [use txn-signature]
  

*/