import React from 'react';

/**
 * Full page or section loading spinner with blurred background logic
 * 
 * @param {Object} props
 * @param {string} props.text - Optional text to show under the spinner
 */
const LoadingSpinner = ({ text = "Fetching weather data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 animate-fade-in">
      {/* Decorative rotating dashed circle */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse"></div>
      </div>
      
      <p className="text-white/90 font-medium tracking-wide animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
