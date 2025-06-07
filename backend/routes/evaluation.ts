import express from 'express';
import multer from 'multer';
import { body, param, query, validationResult } from 'express-validator';
import { createEvaluation, getAllEvaluations, getEvaluationById } from '../controllers/evaluationController';
import { ValidationError } from '../middleware/errorHandler';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (!file) {
      return cb(null, true);
    }
    // Only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Validation middleware
const validateRequest = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Invalid request data', errors.array());
  }
  next();
};

// Create evaluation validation
const createEvaluationValidation = [
  body('taskName').trim().notEmpty().withMessage('Task name is required'),
  body('submissionType').trim().notEmpty().withMessage('Submission type is required'),
  body('codeSnippet').optional().isString().withMessage('Code snippet must be a string'),
  validateRequest
];

// Get evaluations validation
const getEvaluationsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validateRequest
];

// Get evaluation by id validation
const getEvaluationValidation = [
  param('id').isUUID().withMessage('Invalid evaluation ID'),
  validateRequest
];

// Routes
router.post('/',
  upload.single('screenshot'),
  createEvaluationValidation,
  createEvaluation
);

router.get('/',
  getEvaluationsValidation,
  getAllEvaluations
);

router.get('/:id',
  getEvaluationValidation,
  getEvaluationById
);

export { router as evaluationRoutes };