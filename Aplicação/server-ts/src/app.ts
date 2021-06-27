import dotenv from 'dotenv'
dotenv.config()
import { middleares } from "./middlewares";

import './database/index'
import './schedules/sendReport'

const app = middleares

export {app}