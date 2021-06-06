import { UserController } from './controllers/UserController';
import { Router} from 'express'

const routes = Router()

const userController = new UserController()

routes.get('/users', userController.listAll)

export {routes}