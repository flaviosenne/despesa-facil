import "reflect-metadata";
import { ConnectionOptions, createConnection } from 'typeorm';
import request from 'supertest'
import { app } from '../../src/app'
import { tests } from '../../ormconfig';

jest.setTimeout(20000)



let connection = null;
describe('Users', () => {
    beforeAll(async () => {
        connection = 
        await createConnection(tests as ConnectionOptions)
    })
    afterAll(async () => {
        // await connection.dropDatabase()
        await connection.close()
    })

    it('Should returns status 201 when create a user successful', async () => {
        const res = await request(app).post("/users")
            .send({
                email: 'user@example.com',
                name: 'user example',
                password:'123'
            })

        expect(res.status).toBe(201)

    })

    it('Should returns status 400 when email is not provide', async () => {
        const res = await request(app).post("/users")
            .send({
                name: 'user example',
                password:'123'
            })

        expect(res.status).toBe(400)

    })

    it('Should returns status 400 when password is not provide', async () => {
        const res = await request(app).post("/users")
            .send({
                email: 'user@example.com',
                name: 'user example'
            })

        expect(res.status).toBe(400)

    })

    it('Should returns status 400 when name is not provide', async () => {
        const res = await request(app).post("/users")
            .send({
                email: 'user@example.com',
                password:'123'
            })

        expect(res.status).toBe(400)

    })

    it('Should returns status 400 when email already exist', async () => {
        const res = await request(app).post("/users")
            .send({
                email: 'user@example.com',
                name: 'user example',
                password:'123'
            })

        expect(res.status).toBe(400)

    })
})