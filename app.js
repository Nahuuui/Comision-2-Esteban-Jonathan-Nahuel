// importaciones
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'



const app = express()



// middlewares 
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())



app.listen(4000, ()=> {
    console.log('Bienvenido al servidor');
})