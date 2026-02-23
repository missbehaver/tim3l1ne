/**
 * CSV Upload Component
 * Handles file selection and upload
 */

'use client';

import React, { useRef, useState } from 'react';

interface CSVUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export default function CSVUpload({ onFileUpload, isLoading }: CSVUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please select a valid CSV file');
      return;
    }

    await onFileUpload(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileSelect(files[0]);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileSelect(files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
          : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleInputChange}
        disabled={isLoading}
        className="hidden"
        id="csv-upload"
      />

      <div className="space-y-4">
        <div className="text-5xl">📁</div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {isLoading ? 'Processing...' : 'Drop your CSV here or click to browse'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Look for <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">StreamingHistory.json</code> or{' '}
            <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">StreamingHistory.csv</code> files
          </p>
        </div>

        <label htmlFor="csv-upload">
          <button
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isLoading
                ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
            }`}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            {isLoading ? 'Processing...' : 'Select CSV File'}
          </button>
        </label>
      </div>
    </div>
  );
}
