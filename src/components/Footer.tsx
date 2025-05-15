import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TaskEval AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a 
              href="#" 
              className="text-slate-500 hover:text-indigo-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="#" 
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;