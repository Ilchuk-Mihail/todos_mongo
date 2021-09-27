import winston from 'winston'
import {mkdir} from "fs";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true })
)

const transports = [
  new winston.transports.Console({ format: winston.format.json() }),
  new winston.transports.File({ dirname: 'logs', filename: 'all.logs', format: winston.format.json() })
]

const exceptionHandlers = [
  new winston.transports.File({ dirname: 'logs', filename: 'all.logs', format: winston.format.json() })
]
// src/logs/all.log
const Logger = winston.createLogger({
  levels,
  format,
  transports,
  exceptionHandlers
})

export default Logger
