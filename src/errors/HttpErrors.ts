import BaseError from './BaseError'

export class TaskNotFoundError extends BaseError {
  constructor () {
    super(404, 'Task not found')
  }
}

export class InvalidIdError extends BaseError {
  constructor () {
    super(400, 'Invalid Id')
  }
}
