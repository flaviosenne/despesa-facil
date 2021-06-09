import { Connection, createConnection } from 'typeorm';
import { UserService } from './../../src/services/UserService';
import { UserDto } from '../../src/dtos/UserDto';

import  mongoose from 'mongoose'
let connection: Connection
beforeAll(async () => {
    // connection = await createConnection({
    //     type: "sqlite",
    //     database: "../db/despesa_facil_test.sqlite",
    //     entities: ["../../src/models/*.ts"],
    //     cli: {
    //         "entitiesDir": "../../src/models"
    //     },
    //     synchronize: true,
    // })
  

    mongoose.connect("mongodb://localhost:27017/despesa_facil_test",
        { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            // console.log("mongo conectado com sucesso")
        })
})

afterAll(async () => {
    // await connection.dropDatabase()
    // await connection.close()
    mongoose.disconnect()

})

const mockUser: UserDto = {
    name: 'valid_name',
    password: 'valid_password',
    email: 'valid@email'
}

describe('Test user', () => {
    it('should returns status 201 when create user', async () => {
        
        const userService = new UserService()

        const user = userService.save(mockUser)

        expect(user).toBeDefined()
    })
})