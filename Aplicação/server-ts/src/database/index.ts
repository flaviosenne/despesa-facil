import "reflect-metadata";
import { ConnectionOptions, createConnection } from 'typeorm'
import {development} from '../../ormconfig'

createConnection(development as ConnectionOptions)
    .then(() => console.info('db sql connected'))
    .catch(err => console.error(err))
