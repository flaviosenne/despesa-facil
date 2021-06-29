import { ConnectionOptions } from 'typeorm';
import request from 'supertest'
import { app } from '../../src/app'

import "reflect-metadata";
import {  createConnection } from 'typeorm'
import { tests } from '../../ormconfig';


let connection = null;
describe('Users', () => {
    beforeAll(async () => {
        connection = 
        await createConnection(tests as ConnectionOptions)
    })
    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it('Should be able to create a new user', async () => {
        const res = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "user example"
            })

        expect(res.status).toBe(201)

    })
    it('Should not be able to create a user with exist email', async () => {
        const res = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "user example"
            })

        expect(res.status).toBe(400)

    })
})