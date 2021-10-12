import mongoose from 'mongoose'
import config from '../config/index'
import logger from '../lib/logger'

const connection = config.get('MONGODB_CONNECTION')
const database = config.get('MONGODB_DATABASE')

const logMeta = {
  database,
  connection
}

async function connect (): Promise<typeof mongoose | null> {
  return mongoose.connect(connection, {
    dbName: database,
    user: config.get('MONGODB_USER'),
    pass: config.get('MONGODB_PASSWORD')
  }).catch(() => null)
  // error is handled by error event handler below
}

mongoose.connection.on('connected', () => {
  logger.info('mongodb connected', logMeta)
})

mongoose.connection.on('error', err => {
  logger.error(err, logMeta)
})

mongoose.connection.on('disconnected', () => {
  logger.info('mongodb disconnected', logMeta)
})

export {
  connect
  // close
}
