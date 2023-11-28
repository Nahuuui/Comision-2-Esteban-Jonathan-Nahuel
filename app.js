// importaciones
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import {dbConfig} from "./src/db/db-config.js"
import {connectionMongo} from "./src/db/db.js"
import {userouter} from "./src/router/user-router.js"
import {postrouter} from "./src/router/post-router.js"
import {comentariorouter} from "./src/router/comentario-router.js"
import {autotenMiddleware} from "./src/middleware/autoten-middleware.js"


const app = express()



// middlewares 
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// permitimos el acceso cruzado a recursos en el servidor desde diferentes dominios
app.options('*', (req, res) => {
    res.status(200).send();
  });

// router
app.use('/users', userouter)
app.use('/posts', autotenMiddleware , postrouter)
app.use('/comments', autotenMiddleware ,comentariorouter)
app.use('/', (req, res)=> {
    res.send('Pagina inicial')
})

// data base

app.listen(dbConfig.port, async ()=> {
    await connectionMongo()
    console.log(`server iniciado en el puerto:  ${dbConfig.port}`);
})