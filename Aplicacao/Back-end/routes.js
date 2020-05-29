const {Router} = require('express');

const routes = Router();

const RecepController = require('./controllers/RecepController')
const ExpenseController = require('./controllers/ExpenseController')
const UserController = require('./controllers/UserController')

// Users
routes.post('/user', UserController.create);
routes.get('/user', UserController.read);
routes.get('/user/:id', UserController.getOne);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.remove);

// Authentication
routes.post('/authenticate', UserController.authenticate)


// Receps
routes.post('/recep', RecepController.create)
routes.get('/recep', RecepController.read)
routes.get('/recep/:id', RecepController.getOne)
routes.delete('/recep', RecepController.remove)

// Expenses
routes.post('/expense', ExpenseController.create)
routes.get('/expense', ExpenseController.read)
routes.get('/expense/:id', ExpenseController.getOne)
routes.put('/expense', ExpenseController.update)
routes.delete('/expense', ExpenseController.remove)

module.exports = routes;