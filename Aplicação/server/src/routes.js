const { Router } = require('express')

const controllerUser = require('./controllers/UserControllers')
const controllerExpense = require('./controllers/ExpenseController')
const controllerRecep = require('./controllers/RecepController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const CategoryController = require('./controllers/Category')
const FilterByCategoryController = require('./controllers/FilterByCategory')
const route = Router()


route.post('/user', controllerUser.createUser)
route.get('/user', controllerUser.listUser)
route.get('/user/:id', controllerUser.getOneUser)
route.put('/user/:id', controllerUser.updateUser)

route.get('/profile', ProfileController.index)
route.delete('/profile/:id', ProfileController.remove)

route.post('/sessions', SessionController.create)

route.post('/expense', controllerExpense.createExpense)
route.get('/expense', controllerExpense.listExpense)
route.delete('/expense/:id', controllerExpense.deleteExpense)
route.put('/expense/:id', controllerExpense.updateExpense)
route.get('/expense/:id', controllerExpense.getOneExpense)

route.post('/recep', controllerRecep.createRecep)
route.get('/recep', controllerRecep.listRecep)
route.delete('/recep/:id', controllerRecep.deleteRecep)
route.put('/recep/:id', controllerRecep.updateRecep)
route.get('/recep/:id', controllerRecep.getOneRecep)


route.get('/category', CategoryController.listCategory)
route.delete('/category/:id', CategoryController.removeCategory)
route.get('/category-expense', FilterByCategoryController.filterByCategory)

module.exports = route