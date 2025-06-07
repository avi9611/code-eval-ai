"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const express_validator_1 = require("express-validator");
const evaluationController_1 = require("../controllers/evaluationController");
const errorHandler_1 = require("../middleware/errorHandler");
const router = express_1.default.Router();
exports.evaluationRoutes = router;
// Configure multer for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (!file) {
            return cb(null, true);
        }
        // Only accept images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed'));
        }
    },
});
// Validation middleware
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.ValidationError('Invalid request data', errors.array());
    }
    next();
};
// Create evaluation validation
const createEvaluationValidation = [
    (0, express_validator_1.body)('taskName').trim().notEmpty().withMessage('Task name is required'),
    (0, express_validator_1.body)('submissionType').trim().notEmpty().withMessage('Submission type is required'),
    (0, express_validator_1.body)('codeSnippet').optional().isString().withMessage('Code snippet must be a string'),
    validateRequest
];
// Get evaluations validation
const getEvaluationsValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    validateRequest
];
// Get evaluation by id validation
const getEvaluationValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Invalid evaluation ID'),
    validateRequest
];
// Routes
router.post('/', upload.single('screenshot'), createEvaluationValidation, evaluationController_1.createEvaluation);
router.get('/', getEvaluationsValidation, evaluationController_1.getAllEvaluations);
router.get('/:id', getEvaluationValidation, evaluationController_1.getEvaluationById);
//# sourceMappingURL=evaluation.js.map