import { UserController } from './controllers/UserController';
import { Request, Response, Router} from 'express'
import { logged } from './middlewares/auth';
import { PostingsController } from './controllers/PostingsController';
import { ServerError } from './exceptions/ServerError';

const routes = Router()

const userController = new UserController()
const postingsController = new PostingsController()

routes.get('/',(req: Request, res: Response) => {
    try{
        return res.status(200).json()
    }catch(err) {
        throw new ServerError("houve um erro no servidor") 
    }
})

// users
routes.get('/users',logged, userController.listAll)
routes.get('/users/active', logged, userController.listAllActive)
routes.get('/users/:id', logged, userController.findById)
routes.delete('/users/:id', logged, userController.disable)
routes.patch('/users', logged, userController.update)

// postings
routes.get('/postings',logged, postingsController.listAllByFilter)
routes.get('/postings/all',logged, postingsController.listAll)
routes.post('/postings',logged, postingsController.save)
routes.get('/postings/:id', logged, postingsController.findById)
routes.delete('/postings/:id', logged, postingsController.delete)
routes.patch('/postings', logged, postingsController.update)


// resources public
routes.post('/users', userController.save)
routes.post('/login', userController.login)
routes.post('/retrieve-password', userController.retrievePassword)
routes.put('/update-password', userController.updatePassword)


export {routes}