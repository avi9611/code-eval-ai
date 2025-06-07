import { Request, Response, NextFunction } from 'express';
interface AppError extends Error {
    statusCode?: number;
    code?: string;
    errors?: any[];
}
export declare class ValidationError extends Error {
    statusCode: number;
    errors: any[];
    constructor(message: string, errors?: any[]);
}
export declare class NotFoundError extends Error {
    statusCode: number;
    constructor(message: string);
}
export declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map