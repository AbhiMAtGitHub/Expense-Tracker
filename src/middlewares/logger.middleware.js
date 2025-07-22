const morgan = require('morgan');
const winston = require('winston');

// ANSI color codes
const color = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

// Setup Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
    }),
  ],
});

// Request logging (blue)
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  // Store initial log
  console.log(`${color.blue}[REQUEST] ${method} ${originalUrl}${color.reset}`);

  // Wait for response to finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMsg = `[RESPONSE] ${method} ${originalUrl} - ${res.statusCode} (${duration}ms)`;

    const statusColor =
      res.statusCode >= 500
        ? color.red
        : res.statusCode >= 400
          ? color.yellow
          : color.green;

    console.log(`${statusColor}${logMsg}${color.reset}`);
  });

  next();
};

// Morgan for concise logs (CloudWatch-friendly)
const morganLogger = morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

module.exports = [requestLogger, morganLogger];
