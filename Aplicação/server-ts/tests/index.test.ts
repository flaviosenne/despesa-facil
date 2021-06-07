import "reflect-metadata";
import { ConnectionOptions, createConnection, getConnection } from 'typeorm'
import { test } from '../ormconfig'

beforeAll(() => {
    createConnection(test as ConnectionOptions)
        .then(() => console.info('db sqlite connected'))
        .catch(err => console.error(err))
})

afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()

})

describe('test', () => {
    it('test', () => {
        console.log('test')
    })
})