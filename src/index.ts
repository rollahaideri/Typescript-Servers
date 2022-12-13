import fastify from "fastify"
import { Db } from "./utils/db"
import database from "./utils/db"
import { BookRoutes } from "./routes"

declare module 'fastify' {
    interface FastifyRequest {
        db: Db
    }
}

const server = fastify({logger: true})

const start = async () => {

    await server.register(database)
    await server.register(BookRoutes)

    server.listen({port: 3000, host: '0.0.0.0'}, (err, adress) => {
        if (err) {
            server.log.info("Error occurred!", err)
            throw err
        }
        console.log("BASE_URL: ", adress)
        console.log("Listenng at port 3000")


    })


}

start()