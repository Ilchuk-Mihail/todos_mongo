import BaseError from './BaseError'

export class TaskNotFoundError extends BaseError {
  constructor (status = 404, message = 'Task not found') {
    super(status, message)
    this.status = status
    this.message = message
  }
}

export class InvalidIdError extends BaseError {
  constructor (status = 400, message = 'Invalid Id') {
    super(status, message)
    this.status = status
    this.message = message
  }
}
