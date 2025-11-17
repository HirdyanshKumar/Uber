const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();
const cors = require('cors')
const connectToDb = require('./db/db')


app.use(cors())

connectToDb()



module.exports = app;