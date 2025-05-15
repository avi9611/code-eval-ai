import React from 'react';
import { Check, AlertTriangle, Clock } from 'lucide-react';
import { EvaluationResponse } from '../types';

interface EvaluationResultProps {
  evaluation: EvaluationResponse;
}

const EvaluationResult: React.FC<EvaluationResultProps> = ({ evaluation }) => {
  const { taskName, score, feedback, createdAt } = evaluation;
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };
  
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };
  
  const getScoreBackground = (score: number): string => {
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-rose-100';
  };
  
  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Check className="text-emerald-600" />;
    if (score >= 60) return <AlertTriangle className="text-amber-600" />;
    return <AlertTriangle className="text-rose-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {taskName}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <Clock size={14} />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${getScoreBackground(score)}`}>
            <span className={`text-xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
          {getScoreIcon(score)}
          <span>Feedback</span>
        </h3>
        
        <div className="prose prose-slate max-w-none">
          {feedback.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-3 text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResult;