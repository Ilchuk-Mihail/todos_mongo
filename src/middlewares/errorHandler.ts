import { Request, Response, NextFunction } from 'express'
import BaseError from '../errors/BaseError'

export default function errorHandler (error: BaseError, req: Request, res: Response, next: NextFunction): void {
  const status = error.status || 500
  const message = error.message || 'Something went wrong '
  res.send({
    message
  })
}
