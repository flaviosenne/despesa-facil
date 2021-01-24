const { Router } = require('express')

const route = Router()

const UserControler = require('./controllers/UserControllers')
const FlowController = require('./controllers/FlowController')
const SessionController = require('./controllers/SessionController')
const CategoryController = require('./controllers/Category')
const RecoveryPassword = require('./controllers/RecoveryPassword')
const ChartController = require('./controllers/Chart')

const {logged} = require('./middlewares/Logged')

// todos usuarios
route.post('/user', UserControler.createUser)
route.get('/user', UserControler.listUser)
route.get('/user/:id', UserControler.getOneUser)
route.put('/user/:id', UserControler.updateUser)



// despesas de usuario específico
route.get('/flow-expense', logged, FlowController.indexExpense)
route.get('/flow-recep', logged, FlowController.indexRecep)
route.get('/flow', logged, FlowController.indexFlow)
route.post('/flow', logged, FlowController.createFlow)
route.get('/flow/:id', logged, FlowController.getOneFlow)
route.put('/flow/:id', logged, FlowController.updateFlow)
route.delete('/flow/:id', logged, FlowController.removeFlow)



// update password
route.post('/send-email', RecoveryPassword.sendEmail)
route.put('/update-password', RecoveryPassword.updatePassword)



// login
route.post('/sessions', SessionController.create)
route.post('/logged', logged)



// todas categorias
route.get('/category/:id', CategoryController.listCategory)
route.delete('/category/:id', CategoryController.removeCategory)

// despesas e receitas para o gráfico
route.get('/chart', logged, ChartController.getDataToChart)

module.exports = route