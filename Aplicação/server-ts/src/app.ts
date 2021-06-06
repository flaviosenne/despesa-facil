import dotenv from 'dotenv'
dotenv.config()
import { middleares } from "./middlewares";
import { routes } from "./routes";

const app = middleares

app.use(routes)

export {app}