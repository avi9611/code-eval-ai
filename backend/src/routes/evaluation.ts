import express from 'express';
import multer from 'multer';
import { createEvaluation, getAllEvaluations, getEvaluationById } from '../controllers/evaluationController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Routes
router.post('/', upload.single('screenshot'), createEvaluation);
router.get('/', getAllEvaluations);
router.get('/:id', getEvaluationById);

export { router as evaluationRoutes };