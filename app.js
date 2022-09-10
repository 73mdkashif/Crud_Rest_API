require('dotenv').config()
require('express-async-error')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const notfound = require('./middleware/not-found')
const errorhanlers = require('./middleware/error-handler')
const productRouter = require('./routes/products')

app.use(express.json())

app.get('/', (req , res)=>{
    res.send('<h1>Hello World</h1><a href="/api/v1/products"> product </a>')
})

app.use('/api/v1/products',productRouter)

app.use(notfound)
app.use(errorhanlers)

const port = process.env.PORT || 3000

const strat = async (req , res)=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`Server is listening at post : ${port}`))
    } catch (error) {
        console.log(error)
    }
}

strat()
