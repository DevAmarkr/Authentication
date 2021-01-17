import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import UserController from './Controller/Users'

import  './Config/index'
require('dotenv').config()
const app: express.Application = express();
const Port = process.env.PORT || 2021

//Server initial dev-setup middleware
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())

/* Server route aka APIs*/
app.get('/', (req,res)=>{
    res.send({
        name:"React-Express Authentication"
    })
})

app.use('/user',UserController)

app.listen(Port,()=>console.log(`Server is running on ${Port}`))



