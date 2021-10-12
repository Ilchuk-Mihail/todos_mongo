import nconf from 'nconf'
import * as path from 'path'

nconf
  .argv()
  .env()
  .file('any_env', path.resolve(__dirname, 'config.json'))
  .defaults({
    PORT: 3000,
    MONGODB_CONNECTION: 'mongodb://localhost:27017',
    MONGODB_DATABASE: 'todo-dev',
    MONGODB_USER: '',
    MONGODB_PASSWORD: ''
  })

export default nconf
