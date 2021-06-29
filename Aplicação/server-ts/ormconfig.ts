export const development = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "joao",
    database: "despesa_facil",
    logging: false,
    syncronize: true,
    entities: ["./src/models/*.ts"],
    cli: {
        "entitiesDir": "./src/models"
    }
}

export const tests = {
    type: "sqlite",
    database: "./tests/db/db.sqlite",
    logging: false,
    syncronize: true,
    entities: ["./src/models/*.ts"],
    cli: {
        "entitiesDir": "./src/models"
    }
}

