import { createConnection, getConnection } from 'typeorm'
import request from 'supertest'
import { app } from "../src/app";

beforeAll(async () => {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "joao",
        database: "despesa_facil_test",
        entities:["../src/models/*.ts"],
        cli: {
            "entitiesDir": "../src/models"
        },
        synchronize: true,
    })
        .then(() => console.info('db sql test connected'))
        .catch(err => console.error(err))
})

afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()

})

describe('Test server', () => {
    it('should returns ok if aplication server is running', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200)
        expect(res.body.status).toBe(200)
    })
})