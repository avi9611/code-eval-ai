export interface EvaluationResponse {
  id: string;
  taskName: string;
  submissionType: 'code' | 'screenshot';
  score: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}