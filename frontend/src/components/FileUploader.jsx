import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

export const FileUploader = ({ onFileChange, accept = '*/*' }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    onFileChange(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const clearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
          }`}
        >
          <Upload size={24} className="text-slate-400 mb-2" />
          <p className="text-sm text-slate-500 mb-1">
            Drag & drop your file here or click to browse
          </p>
          <p className="text-xs text-slate-400">
            Supports PNG, JPG, JPEG, GIF
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-64 w-full object-contain rounded-md border border-slate-300"
          />
          <button
            type="button"
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 bg-slate-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};