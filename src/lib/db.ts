import mongoose from 'mongoose'
import nconf from 'nconf'

nconf.file({ file: 'config.json' })

const uri = nconf.get('MONGO_URI')

export default {
  async connection (): Promise<void> {
    mongoose.connect(uri)
      .then(result => mongoose.connection)
      .catch(err => err.logger)
  }
}
