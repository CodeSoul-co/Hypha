import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { getConfig } from '../config';

let loggerInstance: winston.Logger | null = null;

export function createLogger(): winston.Logger {
  if (loggerInstance) {
    return loggerInstance;
  }

  const logDir = path.resolve(process.cwd(), 'logs');

  // Ensure logs directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  let config: { level: string; format: string; outputs?: Array<{ type: string; path?: string }> };
  let appEnv = 'development';
  try {
    config = getConfig().logging;
    appEnv = getConfig().app.env;
  } catch {
    // Default config if not loaded yet
    config = {
      level: 'info',
      format: 'json',
      outputs: [
        { type: 'console' },
        { type: 'file', path: './logs/app.log' }
      ]
    };
  }

  // In development mode, use debug level and pretty format by default
  const isDev = appEnv === 'development';
  const logLevel = isDev ? 'debug' : config.level;
  const logFormat = isDev ? 'text' : config.format;

  const formats = [
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
  ];

  if (logFormat === 'json' && !isDev) {
    formats.push(winston.format.json());
  } else {
    // Pretty format for dev mode
    formats.push(
      winston.format.colorize({ all: isDev }),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const metaKeys = Object.keys(meta);
        let metaStr = '';
        if (metaKeys.length > 0) {
          // Pretty print meta objects
          metaStr = ' ' + metaKeys.map(k => {
            const v = meta[k];
            if (typeof v === 'object' && v !== null) {
              return `${k}=${JSON.stringify(v)}`;
            }
            return `${k}=${v}`;
          }).join(' ');
        }
        return `${timestamp} [${level}] ${message}${metaStr}`;
      })
    );
  }

  const transports: winston.transport[] = [];

  for (const output of config.outputs || [{ type: 'console' }]) {
    if (output.type === 'console') {
      transports.push(
        new winston.transports.Console({
          level: logLevel,
        })
      );
    } else if (output.type === 'file' && output.path) {
      const logPath = path.resolve(process.cwd(), output.path);
      const fileDir = path.dirname(logPath);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      transports.push(
        new winston.transports.File({
          filename: logPath,
          level: logLevel,
          maxsize: 10 * 1024 * 1024, // 10MB
          maxFiles: 5,
        })
      );
    }
  }

  loggerInstance = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(...formats),
    transports,
    exitOnError: false,
  });

  return loggerInstance;
}

export const logger = createLogger();

export default logger;
