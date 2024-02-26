import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  level: 'debug', // changed from 'info' to 'debug'
  format: combine(timestamp(), myFormat),
  defaultMeta: { service: 'switch-ai' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    // handle uncaught exceptions
    new winston.transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    // handle unhandled promise rejections
    new winston.transports.File({ filename: 'rejections.log' }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
    }),
  );
}

export default logger;
