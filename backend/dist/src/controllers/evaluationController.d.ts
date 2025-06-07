import { Request, Response, NextFunction } from 'express';
export declare const createEvaluation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllEvaluations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getEvaluationById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=evaluationController.d.ts.map