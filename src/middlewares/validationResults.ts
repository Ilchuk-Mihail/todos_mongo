import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateTaskDto } from '../dto/task.dto'
import logger from '../lib/logger'
import { ValidationError } from '../errors/HttpErrors'
import BaseError from '../errors/BaseError'

export default function validateRequest (input: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // req[dynamicParams] = req.body
    // const data = req[dynamicParams]
    // const body = req.body
    // const param = req.params
    // const dtoObj = plainToClass(CreateTaskDto, body)
    // validate(dtoObj) // -> Validation Error
    // next()

    //  dynamicParams: string[]

    const data = req.body
    data.id = req.params.id
    const dtoObj = plainToClass(input, data)

    validate(dtoObj).then(errors => {
      if (errors.length > 0) {
        logger.info('validation failed. errors: ', errors)
        const message = errors.map(obj => {
          return { value: obj.value, property: obj.property }
        })
        logger.info(message)
        logger.info('validation failed. errors: ', next(new BaseError(400, `Invalid value for property. details ${JSON.stringify(message)}`)))
      } else {
        logger.info('validation succeed')
        next()
      }
    })
  }
}
