import { Router} from 'express'

const routes = Router()

routes.get('/users', (req,res)=> {
    return res.json('olá')
})
export {routes}