import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TaskSubmissionForm from '../components/TaskSubmissionForm';
import EvaluationResult from '../components/EvaluationResult';
import { EvaluationResponse } from '../types';
import { evaluateTask } from '../services/api';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResponse | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const result = await evaluateTask(formData);
      setEvaluationResult(result);
      toast.success('Task evaluated successfully!');
    } catch (error) {
      console.error('Error evaluating task:', error);
      toast.error('Failed to evaluate task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          AI Task Evaluation
        </h1>
        <p className="text-slate-600">
          Submit your task details and code/screenshot for an AI-powered evaluation
        </p>
      </div>

      {!evaluationResult ? (
        <TaskSubmissionForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <div className="space-y-6">
          <EvaluationResult evaluation={evaluationResult} />
          <div className="text-center">
            <button
              onClick={() => setEvaluationResult(null)}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Start New Evaluation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;