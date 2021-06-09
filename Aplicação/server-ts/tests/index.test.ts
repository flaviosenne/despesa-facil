import request from 'supertest'
import { app } from "../src/app";

describe('Test server', () => {
    it('should returns ok if aplication server is running', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200)
    })
})