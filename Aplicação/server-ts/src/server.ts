import { app } from "./app";

const server = app
const port = process.env.PORT || 3000

server.listen(port, () =>console.info('server running in port '+port))