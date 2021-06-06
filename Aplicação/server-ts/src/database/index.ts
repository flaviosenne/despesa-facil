import { createConnection } from 'typeorm'

createConnection()
    .then(() => console.info('db sql connected'))
    .catch(err => console.error(err))