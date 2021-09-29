import { Request, Response, NextFunction } from 'express'
import BaseError from '../errors/BaseError'
import logger from '../lib/logger'

export default function errorHandler (error: BaseError, req: Request, res: Response, next: NextFunction): void {
  const status = error.status || 500
  const message = error.message || 'Something went wrong '
  const meta = error.meta || {}

  logger.error(error.message,  {
    ...meta,
    stack: error.stack
  })
  res.statusCode = status
  res.send({
    message,
    ...meta
  })
}
