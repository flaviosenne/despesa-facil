import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from '../routes'
import { swaggerDocs, swaggerUi } from './swagger'
import { exceptions } from './exceptions';

const middleares = express()

middleares.use(cors())
middleares.use(express.json())
middleares.use(routes)
middleares.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
middleares.use(exceptions)

export { middleares}