import express, { Application } from 'express'
import taskRouter from './routes'
import db from './lib/db'
import config from './config'
import errorHandler from './middlewares/errorHandler'
import logger from './lib/logger'

const app: Application = express()
const port = config.get('PORT')

db.connection().catch(err => err)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', taskRouter)

app.use(errorHandler)

app.listen(port, () => logger.info('Server running on ....', { port: port }))
