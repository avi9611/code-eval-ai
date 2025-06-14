import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { evaluationRoutes } from './routes/evaluation.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: isProduction
    ? ['https://code-eval-ai.vercel.app', 'https://code-eval-ai.vercel.app/api']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 1000 // Limit each IP to 100 requests per windowMs in production
});
app.use(limiter);

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan(isProduction ? 'combined' : 'dev'));

// Trust proxy - needed for rate limiting behind reverse proxy
if (isProduction) {
  app.set('trust proxy', 1);
}

// Routes
app.use('/api/evaluations', evaluationRoutes);

// Root route handler
app.get('/', (_req, res) => {
  res.json({
    message: 'Code Evaluation API',
    version: '1.0.0',
    endpoints: {
      evaluations: '/api/evaluations',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});