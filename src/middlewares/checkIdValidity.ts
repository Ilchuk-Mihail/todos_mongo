import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { InvalidIdError } from '../errors/HttpErrors'

export default function checkIdValidity (req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidIdError()
  }
  next()
}
