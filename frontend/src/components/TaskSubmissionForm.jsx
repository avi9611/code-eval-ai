import React, { useState } from 'react';
import { FileUploader } from './FileUploader';
import { Code, Image, Loader } from 'lucide-react';

const TaskSubmissionForm = ({ onSubmit, isLoading }) => {
  const [taskName, setTaskName] = useState('');
  const [submissionType, setSubmissionType] = useState('code');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [file, setFile] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskName) {
      alert('Please enter a task name');
      return;
    }
    
    if (submissionType === 'code' && !codeSnippet) {
      alert('Please enter your code');
      return;
    }
    
    if (submissionType === 'screenshot' && !file) {
      alert('Please upload a screenshot');
      return;
    }
    
    const formData = new FormData();
    formData.append('taskName', taskName);
    formData.append('submissionType', submissionType);
    
    if (submissionType === 'code') {
      formData.append('codeSnippet', codeSnippet);
    } else if (file) {
      formData.append('screenshot', file);
    }
    
    await onSubmit(formData);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <label htmlFor="taskName" className="block text-sm font-medium text-slate-700 mb-1">
          Task Name
        </label>
        <input
          id="taskName"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="E.g., Create a responsive navbar"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <span className="block text-sm font-medium text-slate-700 mb-2">
          Submission Type
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSubmissionType('code')}
            className={`flex items-center justify-center gap-2 p-4 border rounded-md transition-colors ${
              submissionType === 'code' 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Code size={20} />
            <span className="font-medium">Code Snippet</span>
          </button>
          
          <button
            type="button"
            onClick={() => setSubmissionType('screenshot')}
            className={`flex items-center justify-center gap-2 p-4 border rounded-md transition-colors ${
              submissionType === 'screenshot' 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Image size={20} />
            <span className="font-medium">Screenshot</span>
          </button>
        </div>
      </div>
      
      {submissionType === 'code' ? (
        <div className="mb-6">
          <label htmlFor="codeSnippet" className="block text-sm font-medium text-slate-700 mb-1">
            Code Snippet
          </label>
          <textarea
            id="codeSnippet"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Paste your code here..."
            rows={8}
            className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Screenshot
          </label>
          <FileUploader 
            onFileChange={handleFileChange} 
            accept="image/*"
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader size={16} className="animate-spin" />
              <span>Evaluating...</span>
            </>
          ) : (
            <span>Submit for Evaluation</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskSubmissionForm;