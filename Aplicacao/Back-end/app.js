const routes = require('./routes')
const express = require('express');
const cors = require('cors')
require('./config/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

module.exports = app;