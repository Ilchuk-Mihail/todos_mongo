import { Request, Response, NextFunction } from 'express'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationError } from '../errors/HttpErrors'

type SourceData = 'body' | 'query' | 'params'

export default function validateRequest (input: ClassConstructor<any>, source: SourceData) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source]
    const dtoObj = plainToClass(input, data)
    validate(dtoObj).then(errors => {
      if (errors.length > 0) {
        const constraints: any = Object.values(errors).flat()
        next(new ValidationError({ constraints }))
      } else {
        next()
      }
    })
  }
}
