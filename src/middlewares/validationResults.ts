import { Request, Response, NextFunction } from 'express'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import logger from '../lib/logger'
import { ValidationError } from '../errors/HttpErrors'
import { CreateTaskDto, ReplaceTaskDto, UpdateTaskDto, IdParam, GetDeleteTaskDto } from '../dto/task.dto'

type SourceData = 'body' | 'query' | 'params'
type TaskDto = CreateTaskDto | UpdateTaskDto | ReplaceTaskDto | ReplaceTaskDto | IdParam | GetDeleteTaskDto

export default function validateRequest (input: ClassConstructor<TaskDto>, source: SourceData) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[source]
    const dtoObj = plainToClass(input, data)
    validate(dtoObj).then(errors => {
      if (errors.length > 0) {
        const constraints = errors.map(obj => {
          return { constrains: obj.constraints }
        })
        next(new ValidationError({ constraints }))
      } else {
        logger.info('validation succeed')
        next()
      }
    })
  }
}
