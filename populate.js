require('dotenv').config()

const connectDB = require('./db/connect')
const product = require('./models/product')

const jsonProduct = require('./product.json')

const start = async (req , res)=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()
        await product.create(jsonProduct)
        console.log('Success!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}


start()