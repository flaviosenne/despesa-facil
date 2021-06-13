import { UserController } from './controllers/UserController';
import { Request, Response, Router} from 'express'
import { serverError } from './helpers/responses';
import { logged } from './middlewares/auth';

const routes = Router()

const userController = new UserController()

routes.get('/',(req: Request, res: Response) => {
    try{
        return res.status(200).json()
    }catch(err) {
        throw serverError("houve um erro no servidor") 
    }
})

routes.get('/users',logged, userController.listAll)
routes.get('/users/active', logged, userController.listAllActive)
routes.get('/users/:id', logged, userController.findById)
routes.delete('/users/:id', logged, userController.disable)
routes.put('/users', logged, userController.update)

// resources public
routes.post('/users', userController.save)
routes.post('/login', userController.login)
routes.post('/retrieve-password', userController.retrievePassword)

export {routes}