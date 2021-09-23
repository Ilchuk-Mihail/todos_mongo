import { Request, Response, NextFunction } from 'express'
import HttpError from '../utils/HttpError'
import mongoose from 'mongoose'

export default {
  errorHandlerMiddleware (error: HttpError, req: Request, res: Response, next: NextFunction): void {
    const status = error.status || 500
    const message = error.message || 'Something went wrong '
    res
      .status(status)
      .send({
        status,
        message
      })
  },

  checkIdValidity (req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new HttpError(400, 'Invalid ID'))
    }
    next()
  }
}
