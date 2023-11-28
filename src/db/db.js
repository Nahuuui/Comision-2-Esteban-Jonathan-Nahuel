import { connect } from "mongoose"
import { dbConfig } from "./db-config.js";


export const connectionMongo = async () => {
    try {
        const db = await connect(dbConfig.mongo_uri)
        console.log(`Bienvenido, estas conectado a la db: ${db.connection.name}`);
    } catch (error) {
        console.log(error);
    }
}
