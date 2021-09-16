import mongoose from 'mongoose'
import config from '../config/index'

const uri = config.get('MONGO_URI')

export default {
  async connection (): Promise<void> {
    mongoose.connect(uri)
      .then(result => mongoose.connection)
      .catch(err => err.logger)
  }
}
