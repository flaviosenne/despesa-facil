const routes = require('./routes')
const express = require('express');
require('./config/database')

const app = express()

app.use(express.json())
app.use(routes)

module.exports = app;