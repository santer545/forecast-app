import React, { useState } from 'react';

const ErrorBox = ({ message = '', type = 'error', onClose = () => {} }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null; // Не відображаємо компонент, якщо він прихований
  }

  // Визначення кольорів та іконок залежно від типу
  let bgColor, borderColor, textColor, icon;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-100 dark:bg-green-800';
      borderColor = 'border-green-400';
      textColor = 'text-green-700 dark:text-green-200';
      icon = (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case 'warning':
      bgColor = 'bg-yellow-100 dark:bg-yellow-800';
      borderColor = 'border-yellow-400';
      textColor = 'text-yellow-700 dark:text-yellow-200';
      icon = (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 11a1 1 0 100-2 1 1 0 000 2zm1-3a1 1 0 10-2 0v2a1 1 0 102 0V8z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case 'info':
      bgColor = 'bg-blue-100 dark:bg-blue-800';
      borderColor = 'border-blue-400';
      textColor = 'text-blue-700 dark:text-blue-200';
      icon = (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case 'error':
    default:
      bgColor = 'bg-red-100 dark:bg-red-800';
      borderColor = 'border-red-400';
      textColor = 'text-red-700 dark:text-red-200';
      icon = (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
  }

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // Викликаємо зовнішній обробник, якщо він наданий
    }
  };

  return (
    <div className={`relative p-4 mb-4 text-sm rounded-lg border ${bgColor} ${borderColor} ${textColor}`} role="alert">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={handleClose}
        type="button"
        className={`absolute top-2 right-2 text-current p-1 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 ${textColor}`}
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorBox;
