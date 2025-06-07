"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const evaluation_1 = require("./routes/evaluation");
const errorHandler_1 = require("./middleware/errorHandler");
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: isProduction
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000 // Limit each IP to 100 requests per windowMs in production
});
app.use(limiter);
// Request parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Logging
app.use((0, morgan_1.default)(isProduction ? 'combined' : 'dev'));
// Trust proxy - needed for rate limiting behind reverse proxy
if (isProduction) {
    app.set('trust proxy', 1);
}
// Routes
app.use('/api/evaluations', evaluation_1.evaluationRoutes);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map