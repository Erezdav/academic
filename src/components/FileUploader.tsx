'use client';

import { useState } from 'react';
import { useTranslation } from '../app/i18n/client';
import { FaUpload, FaFile, FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileImage, FaTrash } from 'react-icons/fa';

export default function FileUploader({ lng }) {
  const { t, dir } = useTranslation();
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('word') || fileType.includes('docx') || fileType.includes('doc')) return <FaFileWord className="text-blue-500" />;
    if (fileType.includes('excel') || fileType.includes('xlsx') || fileType.includes('xls')) return <FaFileExcel className="text-green-500" />;
    if (fileType.includes('powerpoint') || fileType.includes('pptx') || fileType.includes('ppt')) return <FaFilePowerpoint className="text-orange-500" />;
    if (fileType.includes('image')) return <FaFileImage className="text-purple-500" />;
    return <FaFileAlt className="text-gray-500" />;
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        {t('uploader.title')}
      </h3>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
        } transition-colors cursor-pointer`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
        />
        
        <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
        <p className="text-gray-700 font-medium mb-1">
          {t('uploader.drag_drop')}
        </p>
        <p className="text-gray-500 text-sm">
          {t('uploader.or')} <span className="text-primary-500">{t('uploader.browse')}</span>
        </p>
        <p className="text-gray-400 text-xs mt-2">
          {t('uploader.max_size')}
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-3">
            {t('uploader.uploaded_files')}
          </h4>
          
          <div className="space-y-3">
            {files.map(file => (
              <div 
                key={file.id} 
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex items-center">
                  <div className="mr-3 rtl:ml-3 rtl:mr-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove file"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            {t('uploader.upload_all')}
          </button>
        </div>
      )}
    </div>
  );
}
