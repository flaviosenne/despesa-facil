const { Router } = require('express')

const controllerUser = require('./controllers/UserControllers')
const controllerExpense = require('./controllers/ExpenseController')
const controllerRecep = require('./controllers/RecepController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const CategoryController = require('./controllers/Category')
const RecoVeryPassword = require('./controllers/RecoveryPassword')
const route = Router()

// todos usuarios
route.post('/user', controllerUser.createUser)
route.get('/user', controllerUser.listUser)
route.get('/user/:id', controllerUser.getOneUser)
route.put('/user/:id', controllerUser.updateUser)


// despesas de usuario específico
route.post('/profile-expense', ProfileController.indexExpense)
route.delete('/profile-expense/:id', ProfileController.removeExpense)

route.post('/profile-all', ProfileController.indexExpenseAll)
// receitas de usuario específico
route.get('/profile-recep', ProfileController.indexRecep)
route.delete('/profile-recep/:id', ProfileController.removeExpense)


// update password
route.post('/send-email', RecoVeryPassword.sendEmail)
route.put('/update-password', RecoVeryPassword.updatePassword)


// login
route.post('/sessions', SessionController.create)


// todas despesas
route.post('/expense', controllerExpense.createExpense)
route.get('/expense', controllerExpense.listExpense)
route.delete('/expense/:id', controllerExpense.deleteExpense)
route.put('/expense/:id', controllerExpense.updateExpense)
route.get('/expense/:id', controllerExpense.getOneExpense)


// todas receitas
route.post('/recep', controllerRecep.createRecep)
route.get('/recep', controllerRecep.listRecep)
route.delete('/recep/:id', controllerRecep.deleteRecep)
route.put('/recep/:id', controllerRecep.updateRecep)
route.get('/recep/:id', controllerRecep.getOneRecep)


// todas categorias
route.get('/category', CategoryController.listCategory)
route.delete('/category/:id', CategoryController.removeCategory)

module.exports = route