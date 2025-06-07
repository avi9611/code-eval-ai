"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.NotFoundError = exports.ValidationError = void 0;
class ValidationError extends Error {
    statusCode;
    errors;
    constructor(message, errors) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.errors = errors || [];
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
const errorHandler = (err, _req, res, _next) => {
    // Log error
    console.error(err);
    // Default error values
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    // Determine if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    // Error response object
    const errorResponse = {
        status: 'error',
        statusCode,
        message: isProduction && statusCode === 500 ? 'Internal server error' : message,
    };
    // Add validation errors if present
    if (err instanceof ValidationError && err.errors) {
        errorResponse.errors = err.errors;
    }
    // Add error code if present
    if (err.code) {
        errorResponse.code = err.code;
    }
    // Only include stack trace in development
    if (!isProduction && err.stack) {
        errorResponse.stack = err.stack;
    }
    // Send response
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map