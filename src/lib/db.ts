import mongoose from 'mongoose'
import config from '../config/index'

const user = config.get('MONGODB_USER')
const password = config.get('MONGODB_PASSWORD')
const connection = config.get('MONGODB_CONNECTION')
const db = config.get('MONGODB_DATABASE')
const uri = `mongodb://${user}:${password}@${connection}:27017/${db}`
const uriMongoDocker = 'mongodb://admin:admin@mongo:27017/?authSource=admin'

export default {
  async connection (): Promise<void> {
    mongoose.connect(uri)
      .catch(err => err.logger)
  }
}
