/**
 * Simple logging utility
 */
class Logger {
  /**
   * Log an informational message
   * @param {string} message - Message to log
   * @param {Object} [data] - Optional data to log
   */
  static info(message, data) {
    console.log(`[INFO] ${message}`, data || '');
  }

  /**
   * Log a warning message
   * @param {string} message - Message to log
   * @param {Object} [data] - Optional data to log
   */
  static warn(message, data) {
    console.warn(`[WARN] ${message}`, data || '');
  }

  /**
   * Log an error message
   * @param {string} message - Message to log
   * @param {Error|Object} [error] - Optional error to log
   */
  static error(message, error) {
    console.error(`[ERROR] ${message}`, error || '');
  }

  /**
   * Log a debug message (only in development)
   * @param {string} message - Message to log
   * @param {Object} [data] - Optional data to log
   */
  static debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
}

module.exports = Logger;