import BaseError from './BaseError'

export class TaskNotFoundError extends BaseError {
  constructor () {
    super(404, 'Task not found')
  }
}

export class ValidationError extends BaseError {
  constructor (meta: Record<string, unknown>) {
    super(400, 'Validation error', meta)
  }
}
