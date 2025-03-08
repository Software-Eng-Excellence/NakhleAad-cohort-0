// import winston from 'winston';
// import config from '../config';


// const fileLogsDir = config.fileLogsDir;
// const isDev = config.isDev;


// const logFileFormat = winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json(),
//     winston.format.prettyPrint(),
//     winston.format.errors({ stack: true }),
// );

// const logConsoleFormat = winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp({ format: 'HH:mm:ss' }),
//     winston.format.errors({ stack: true }),
//     winston.format.splat(),
//     winston.format.printf(({ level, message, timestamp,stack }) => {
//         return `[${timestamp}] ${level}: ${message} ${stack || ''}`;
// })
// );

// const logger = winston.createLogger({
//     level: 'info',
//     transports: [
//         new winston.transports.Console({ format: logConsoleFormat }),
//         new winston.transports.File({ filename: 'error.log', level: 'error',dirname: fileLogsDir,format: logFileFormat }),
//         new winston.transports.File({ filename: 'all.log',dirname: fileLogsDir ,format: logFileFormat }),
//     ],
//     exceptionHandlers: [
//         new winston.transports.File({ filename: 'exceptions.log',dirname: fileLogsDir }),
//     ],
// });
// if (isDev) {
//     logger.add(new winston.transports.Console({
//         format: logConsoleFormat,
//     }));
//     logger.level = 'debug';
// };
// export default logger;
import winston from 'winston';
import config from '../config';

const fileLogsDir = config.fileLogsDir;
const isDev = config.isDev;

const logFileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.errors({ stack: true }),
);

const logConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return `[${timestamp}] ${level}: ${message} ${stack || ''}`;
    })
);

const logger = winston.createLogger({
    level: isDev ? 'debug' : 'info', // Set the log level based on the environment
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error', dirname: fileLogsDir, format: logFileFormat }),
        new winston.transports.File({ filename: 'all.log', dirname: fileLogsDir, format: logFileFormat }),
        // Add console transport only once
        new winston.transports.Console({ format: logConsoleFormat }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log', dirname: fileLogsDir }),
    ],
});

export default logger;
