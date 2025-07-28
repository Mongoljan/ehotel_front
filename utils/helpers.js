/**
 * Enhanced utilities for error handling, logging, and user notifications
 */

import toast from 'react-hot-toast';

// Error logging utility
export const logger = {
  error: (message, error, context = {}) => {
    console.error(`[ERROR] ${message}:`, error, context);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      // sentryLog(error, { message, ...context });
    }
  },
  
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}:`, data);
  },
  
  info: (message, data = {}) => {
    console.info(`[INFO] ${message}:`, data);
  }
};

// Enhanced error handler with user notifications
export const handleApiError = (error, context = '', showToast = true) => {
  let message = 'An unexpected error occurred';
  
  if (error?.response) {
    // HTTP error responses
    const status = error.response.status;
    switch (status) {
      case 400:
        message = 'Invalid request. Please check your input.';
        break;
      case 401:
        message = 'Session expired. Please login again.';
        break;
      case 403:
        message = 'Access denied. You do not have permission.';
        break;
      case 404:
        message = 'Requested data not found.';
        break;
      case 429:
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        message = `Server error (${status}). Please try again.`;
    }
  } else if (error?.message) {
    message = error.message;
  }
  
  logger.error(`API Error in ${context}`, error);
  
  if (showToast) {
    toast.error(message, {
      duration: 4000,
      position: 'top-right'
    });
  }
  
  return message;
};

// Success notification utility
export const showSuccess = (message, duration = 3000) => {
  toast.success(message, {
    duration,
    position: 'top-right'
  });
};

// Loading toast utility
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message, {
    position: 'top-right'
  });
};

// Dismiss specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Retry utility for failed API calls
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      logger.warn(`API call failed (attempt ${attempt}/${maxRetries})`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
};

// Local storage utilities with error handling
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('localStorage.setItem failed', error);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      logger.error('localStorage.getItem failed', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error('localStorage.removeItem failed', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logger.error('localStorage.clear failed', error);
      return false;
    }
  }
};

// Format currency utility
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    logger.error('Currency formatting failed', error);
    return `${currency} ${amount}`;
  }
};

// Format date utility
export const formatDate = (date, options = {}) => {
  try {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
  } catch (error) {
    logger.error('Date formatting failed', error);
    return date.toString();
  }
};

// Debounce utility for search inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle utility for scroll events
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return (...args) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(null, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};
