// set env variables before everything
process.env.ETCD_ENABLED = 'false'
process.env.MONGODB_DATABASE = 'tasks-test'

/* eslint-disable import/first */
import config from '../src/config'
import * as db from '../src/lib/db'
import logger from '../src/lib/logger'
import axios from 'axios'
import mongoose from 'mongoose'

axios.defaults.baseURL = `http://localhost:${config.get('PORT')}`

;(async () => {
  try {
    await db.connect()
    logger.info('dropping stale test databases')
    await mongoose.connection.db.dropDatabase()
    //
    // place to load mock data
    //
    await mongoose.connection.close()

    // start up the server so the tests can run using the app
    require('../src/app')
    // with mocha's "delay" option, we start the tests after initial db connection
    run()

    // Assume database connection failed if tests haven't started. Otherwise tests will just hang.
    setTimeout(() => {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Failed to connect to database')
      }
    }, 30000)
  } catch (err: any) {
    logger.error(err.message, { stack: err.stack })
    process.exit(1)
  }
})()
