import express, { Application } from 'express'
import itemsRouter from './routes'
import db from './lib/db'
import config from './config'

const app: Application = express()
const port = config.get('PORT')

db.connection().catch(err => err)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', itemsRouter)

app.listen(port)
