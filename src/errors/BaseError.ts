class BaseError extends Error {
  constructor (public status: number, message: string, public meta: Record<string, unknown> = {}) {
    super(message)
  }
}

export default BaseError
