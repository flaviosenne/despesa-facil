const { Router } = require('express')

const route = Router()

const controllerUser = require('./controllers/UserControllers')
const FlowController = require('./controllers/FlowController')
const SessionController = require('./controllers/SessionController')
const CategoryController = require('./controllers/Category')
const RecoVeryPassword = require('./controllers/RecoveryPassword')


// todos usuarios
route.post('/user', controllerUser.createUser)
route.get('/user', controllerUser.listUser)
route.get('/user/:id', controllerUser.getOneUser)
route.put('/user/:id', controllerUser.updateUser)



// despesas de usuario específico
route.post('/flow', FlowController.createFlow)
route.get('/flow', FlowController.indexFlow)
route.get('/flow/:id', FlowController.getOneFlow)
route.put('/flow/:id', FlowController.updateFlow)
route.delete('/flow/:id', FlowController.removeFlow)



// update password
route.post('/send-email', RecoVeryPassword.sendEmail)
route.put('/update-password', RecoVeryPassword.updatePassword)



// login
route.post('/sessions', SessionController.create)



// todas categorias
route.get('/category', CategoryController.listCategory)
route.delete('/category/:id', CategoryController.removeCategory)

module.exports = route