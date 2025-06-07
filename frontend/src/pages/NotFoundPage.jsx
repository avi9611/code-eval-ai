import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <AlertCircle size={64} className="text-indigo-600 mb-6" />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h1>
      <p className="text-slate-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;