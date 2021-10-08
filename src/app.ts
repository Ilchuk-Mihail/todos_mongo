import express, { Application } from 'express'
import taskRouter from './routes'
import { connection } from './lib/db'
import config from './config'
import errorHandler from './middlewares/errorHandler'
import logger from './lib/logger'

const app: Application = express()
const port = config.get('PORT')

connection().catch((err: any) => err)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', taskRouter)

app.use(errorHandler)

app.listen(port, () => logger.info('Server running on ....', { port: port }))

export default app
