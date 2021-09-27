import winston from 'winston'

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
  new winston.transports.File({ filename: 'src/logs/all.log', format: winston.format.json() })
]

const exceptionHandlers = [
  new winston.transports.File({ filename: 'src/logs/all.log', format: winston.format.json() })
]

const Logger = winston.createLogger({
  levels,
  format,
  transports,
  exceptionHandlers
})

export default Logger
