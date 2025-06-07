"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvaluationById = exports.getAllEvaluations = exports.createEvaluation = void 0;
const geminiClient_1 = require("../utils/geminiClient");
const client_1 = __importDefault(require("../prisma/client"));
// Create a new evaluation
const createEvaluation = async (req, res, next) => {
    try {
        const { taskName, submissionType, codeSnippet } = req.body;
        // Validate input
        if (!taskName) {
            return res.status(400).json({ message: 'Task name is required' });
        }
        if (!submissionType) {
            return res.status(400).json({ message: 'Submission type is required' });
        }
        // Process based on submission type
        let score = 0;
        let feedback = '';
        if (submissionType === 'code') {
            if (!codeSnippet) {
                return res.status(400).json({ message: 'Code snippet is required' });
            }
            // Evaluate code with Gemini
            const evaluation = await (0, geminiClient_1.evaluateCodeWithGemini)(taskName, codeSnippet);
            score = evaluation.score;
            feedback = evaluation.feedback;
        }
        else if (submissionType === 'screenshot') {
            if (!req.file) {
                return res.status(400).json({ message: 'Screenshot is required' });
            }
            // Evaluate screenshot with Gemini
            const evaluation = await (0, geminiClient_1.evaluateScreenshotWithGemini)(taskName, req.file.buffer);
            score = evaluation.score;
            feedback = evaluation.feedback;
        }
        else {
            return res.status(400).json({ message: 'Invalid submission type' });
        }
        // Save evaluation to database
        const evaluation = await client_1.default.evaluation.create({
            data: {
                taskName,
                submissionType,
                codeSnippet: submissionType === 'code' ? codeSnippet : null,
                // We don't store the image in the database, just metadata
                hasScreenshot: submissionType === 'screenshot',
                score,
                feedback,
            },
        });
        return res.status(201).json(evaluation);
    }
    catch (error) {
        return next(error);
    }
};
exports.createEvaluation = createEvaluation;
// Get all evaluations
const getAllEvaluations = async (_req, res, next) => {
    try {
        const evaluations = await client_1.default.evaluation.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json(evaluations);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllEvaluations = getAllEvaluations;
// Get evaluation by ID
const getEvaluationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const evaluation = await client_1.default.evaluation.findUnique({
            where: {
                id: String(id),
            },
        });
        if (!evaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        return res.status(200).json(evaluation);
    }
    catch (error) {
        return next(error);
    }
};
exports.getEvaluationById = getEvaluationById;
//# sourceMappingURL=evaluationController.js.map