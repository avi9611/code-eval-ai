import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600">
            <Brain size={28} />
            <span className="font-bold text-xl">TaskEval AI</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-indigo-600 transition-colors ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              New Evaluation
            </Link>
            <Link 
              to="/history" 
              className={`text-sm font-medium hover:text-indigo-600 transition-colors ${
                location.pathname === '/history' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              History
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;