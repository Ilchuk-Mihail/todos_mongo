import express, { Application } from 'express'
import taskRouter from './routes'
import * as db from './lib/db'
import config from './config'
import errorHandler from './middlewares/errorHandler'
import logger from './lib/logger'
import swaggerUI from 'swagger-ui-express'
import openapi from 'openapi-comment-parser'
import path from 'path'

const app: Application = express()
const port = config.get('PORT')
const spec = openapi({ include: [path.resolve(__dirname, 'routes.ts'), path.join(__dirname, 'openapi/todo.yml')] })

db.connect()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', taskRouter)

app.use(errorHandler)

app.listen(port, () => logger.info('Server running on ....', { port: port }))

export default app
