export const logger = {
  info: (message, data = {}) => {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`, data);
  },
  
  error: (message, error = {}) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);
  },
  
  warn: (message, data = {}) => {
    console.warn(`[${new Date().toISOString()}] WARN: ${message}`, data);
  },
  
  request: (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  }
};