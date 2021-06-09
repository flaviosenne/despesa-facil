import { createConnection, getConnection } from 'typeorm'
import request from 'supertest'
import { app } from "../../src/app";

beforeAll(async () => {
    await createConnection({
        type: "sqlite",
        database: "../db/despesa_facil_test.sqlite",
        entities:["../../src/models/*.ts"],
        cli: {
            "entitiesDir": "../../src/models"
        },
        synchronize: true,
    })
        .then(() => console.info('db sql test connected'))
        .catch(err => console.error(err))
})

// afterAll(async () => {
//     const connection = getConnection()
//     await connection.dropDatabase()
//     await connection.close()

// })

describe('Test user', () => {
    it('should returns status ok when list users', async () => {
        const res = await request(app).get('/users');

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
    })
})