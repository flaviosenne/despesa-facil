import express from 'express'
import { exceptions } from './exceptions'
import { swaggerDocs, swaggerUi } from './swagger'

const middleares = express()

middleares.use(express.json())
middleares.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
middleares.use(exceptions)

export { middleares}