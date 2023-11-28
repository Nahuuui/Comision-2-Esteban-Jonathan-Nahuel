import {config} from "dotenv"                     
config()

export const dbConfig = {
    port: process.env.PORT || 4000,                          
    mongo_uri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET, 
}