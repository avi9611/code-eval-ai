import { Request, Response, NextFunction } from 'express';
import { evaluateCodeWithGemini, evaluateScreenshotWithGemini } from '../utils/geminiClient';
import prisma from '../prisma/client';


// Create a new evaluation
export const createEvaluation = async (req: Request, res: Response, next: NextFunction) => {
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
      const evaluation = await evaluateCodeWithGemini(taskName, codeSnippet);
      score = evaluation.score;
      feedback = evaluation.feedback;
    } else if (submissionType === 'screenshot') {
      if (!req.file) {
        return res.status(400).json({ message: 'Screenshot is required' });
      }
      
      // Evaluate screenshot with Gemini
      const evaluation = await evaluateScreenshotWithGemini(
        taskName,
        req.file.buffer
      );
      score = evaluation.score;
      feedback = evaluation.feedback;
    } else {
      return res.status(400).json({ message: 'Invalid submission type' });
    }
    
    // Save evaluation to database
    const evaluation = await prisma.evaluation.create({
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
  } catch (error) {
    return next(error);
  }
};

// Get all evaluations
export const getAllEvaluations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const evaluations = await prisma.evaluation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return res.status(200).json(evaluations);
  } catch (error) {
    return next(error);
  }
};

// Get evaluation by ID
export const getEvaluationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const evaluation = await prisma.evaluation.findUnique({
      where: {
        id: String(id),
      },
    });
    
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    
    return res.status(200).json(evaluation);
  } catch (error) {
    return next(error);
  }
};