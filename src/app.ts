import express, { Application } from 'express'
import taskRouter from './routes'
import * as db from './lib/db'
import config from './config'
import errorHandler from './middlewares/errorHandler'
import logger from './lib/logger'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const app: Application = express()
const port = config.get('PORT')

db.connect()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(YAML.load('swagger-config.yml')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', taskRouter)

app.use(errorHandler)

app.listen(port, () => logger.info('Server running on ....', { port: port }))

export default app
