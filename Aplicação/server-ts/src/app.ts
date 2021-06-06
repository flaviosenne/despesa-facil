import dotenv from 'dotenv'
dotenv.config()
import { middleares } from "./middlewares";
import { routes } from "./routes";
import './database/index'

const app = middleares

app.use(routes)

export {app}