import React from 'react';

/**
 * Display user-friendly error messages
 * 
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {Function} props.onClear - Callback to dismiss the error
 */
const ErrorMessage = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <div className="glass-card !bg-red-500/20 !border-red-400/50 p-4 mb-6 flex items-center justify-between animate-fade-in shadow-red-900/20">
      <div className="flex items-center text-white">
        <svg 
          className="w-6 h-6 mr-3 text-red-200 shrink-0" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-sm md:text-base font-medium drop-shadow-sm px-1 break-words">{message}</p>
      </div>
      
      {onClear && (
        <button 
          onClick={onClear}
          className="ml-4 p-1.5 hover:bg-red-500/30 rounded-full transition-colors shrink-0 outline-none focus:ring-2 focus:ring-red-200/50 border border-transparent"
        >
          <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
