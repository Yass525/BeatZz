const express = require('express')
const morgan = require ('morgan')
const creteError = require ('http-errors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')

require('dotenv').config({ path: '../../.env' })

require('../../db')

const exempleRoute = require('./Routes/exemple.route')

const limiter = rateLimit({
    max:5,
    windowMs: 1 * 60 * 1000,
    standardHeaders: true,
	legacyHeaders: false, 
})

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(limiter)
app.use(helmet.xssFilter());
app.use(helmet.hsts());

app.get('/', async(req,res,next)=>{
     res.send("basic user")
})

app.use('/exemple', exempleRoute)

app.use(async(req,res,next)=>{
    // const error = new Error ("Not found")
    // error.status = 404
    // next(error)
    next(creteError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error :{
            status: err.status || 500,
            message: err.message,
        }
    })
})

 const PORT =  3001

 app.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })