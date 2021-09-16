import mongoose from "mongoose";
import express, {Application} from 'express';
import nconf from 'nconf'
nconf.file({ file: 'config.json' });

const app: Application = express()
const port = nconf.get('PORT')
const uri = nconf.get('MONGO_URI')

mongoose.connect(uri)
  .then(result => console.log("Successfully connected..."+ result))
  .catch(err => console.log(err))

import itemsRouter from './routes'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/items', itemsRouter)


app.listen(port, ()=> console.log('Server running......'))