import express from 'express'
import { swaggerDocs, swaggerUi } from './swagger'

const middleares = express()

middleares.use(express.urlencoded({extended: false}))
middleares.use(express.json())
middleares.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export { middleares}