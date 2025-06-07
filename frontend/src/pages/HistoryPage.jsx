import React, { useEffect, useState } from 'react';
import { Clock, Loader } from 'lucide-react';
import { fetchEvaluationHistory } from '../services/api';
import EvaluationResult from '../components/EvaluationResult';

const HistoryPage = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchEvaluationHistory();
        setEvaluations(history);
      } catch (err) {
        console.error('Error fetching evaluation history:', err);
        setError('Failed to load evaluation history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-rose-600 bg-rose-50';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size={32} className="text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600">Loading evaluation history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 text-rose-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (evaluations.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">No evaluations yet</h2>
        <p className="text-slate-600 mb-6">Submit a task for evaluation to see your history here.</p>
        <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Start New Evaluation
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Evaluation History</h1>
        <p className="text-slate-600">Review your previous task evaluations</p>
      </div>

      {selectedEvaluation ? (
        <div className="space-y-6">
          <EvaluationResult evaluation={selectedEvaluation} />
          <div className="text-center">
            <button
              onClick={() => setSelectedEvaluation(null)}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Back to History
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {evaluations.map((evaluation) => (
              <li 
                key={evaluation.id}
                className="transition-colors hover:bg-slate-50 cursor-pointer"
                onClick={() => setSelectedEvaluation(evaluation)}
              >
                <div className="p-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-slate-800">{evaluation.taskName}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Clock size={14} />
                      <span>{formatDate(evaluation.createdAt)}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(evaluation.score)}`}>
                    Score: {evaluation.score}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;