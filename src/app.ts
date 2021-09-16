import express, { Application } from 'express'
import itemsRouter from './routes'
import nconf from 'nconf'
import db from './lib/db'
nconf.file({ file: 'config.json' })

const app: Application = express()
const port = nconf.get('PORT')

db.connection().catch(err => err)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', itemsRouter)

app.listen(port)
