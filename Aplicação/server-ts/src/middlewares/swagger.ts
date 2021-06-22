import swaggerJSDoc, {Options} from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions: Options = {
    swaggerDefinition: {
        info: {
            title:'Despesa Facil API',
            description: 'Documentação da API de Despesa Facil',
            contact: {
                name:'flavio senne'
            },
            version: '0.1',    
            servers: ['http://localhost:3000'] 
        }
    },
    apis:['../routes.ts']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}