import express from 'express'

const middleares = express()

middleares.use(express.urlencoded({extended: false}))
middleares.use(express.json())

export { middleares}