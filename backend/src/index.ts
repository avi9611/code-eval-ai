import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { evaluationRoutes } from './routes/evaluation';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/evaluations', evaluationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});