import { Request, Response, NextFunction } from 'express'
import BaseError from '../errors/BaseError'
import logger from '../lib/logger'

export default function errorHandler (error: BaseError, req: Request, res: Response, next: NextFunction): void {
  const status = error.status || 500
  const message = error.message || 'Something went wrong '
  const meta = error.meta || {}

  logger.error('Error Message:', {
    message: message,
    statusCode: status,
    meta: meta
  })
  res.send({
    message,
    ...meta
  })
}
