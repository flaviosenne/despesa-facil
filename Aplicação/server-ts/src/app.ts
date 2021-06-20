import dotenv from 'dotenv'
dotenv.config()
import { middleares } from "./middlewares";
import { routes } from "./routes";
import './database/index'
import './schedules/sendReport'

const app = middleares

app.use(routes)

export {app}