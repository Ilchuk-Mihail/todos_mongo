import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateTaskDto } from '../dto/task.dto'
import logger from '../lib/logger'
import { ValidationError } from '../errors/HttpErrors'
import BaseError from '../errors/BaseError'

type SourceData = 'body' | 'query' | 'params'

export default function validateRequest (input: any, source: SourceData) {
  return (req: Request, res: Response, next: NextFunction) => {
    // req[dynamicParams] = req.body
    // const data = req[dynamicParams]
    // const body = req.body
    // const param = req.params
    // const dtoObj = plainToClass(CreateTaskDto, body)
    // validate(dtoObj) // -> Validation Error
    // next()

    //  dynamicParams: string[]

    // const data = req[source]
    // data.id = req.params.id
    const dtoObj = plainToClass(input, req[source])

    validate(dtoObj).then(errors => {
      if (errors.length > 0) {
        logger.info('validation failed. errors: ', errors)
        const message = errors.map(obj => {
          return { value: obj.value, property: obj.property }
        })
        logger.info(message)
        logger.info('validation failed. errors: ', next(new BaseError(400, `Invalid value for property. details ${JSON.stringify(message)}`)))

        // next(new ValidationError({ errors }))
      } else {
        logger.info('validation succeed')
        next()
      }
    })
  }
}

// const test = {
//   prop1: 1,
//   prop2 : 2
// }

// test.prop1 === test['prop1']

// {
//   'prop': ['email is valid', ''],
//   'prop2': ['']
// }

// failedConstraints  []