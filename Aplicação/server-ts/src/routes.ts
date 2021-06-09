import { UserController } from './controllers/UserController';
import { Request, Response, Router} from 'express'
import { serverError } from './helpers/responses';

const routes = Router()

const userController = new UserController()

routes.get('/',(req: Request, res: Response) => {
    try{
        return res.status(200).json()
    }catch(err) {
        throw serverError("houve um erro no servidor") 
    }
})
routes.get('/users', userController.listAll)
routes.post('/users', userController.save)

export {routes}