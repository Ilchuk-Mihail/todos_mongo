import mongoose from 'mongoose'
import config from '../config/index'

const uri = config.get('MONGO_URI')
// const testUri = config.get('MONGO_URI_TEST')
export async function connection (): Promise<void> {
  return mongoose.connect(uri)
    .then(_result => mongoose.connection)
    .catch(err => err.logger)
}
