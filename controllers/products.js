const Product = require('../models/product')

const getAllPoductsStatic = async (req , res)=>{
    const products = await Product.find({}).select('name price')
    res.status(200).json({products , nbHits:products.length})
}
const getAllPoduct = async (req , res)=>{
    const {featured , company , name , sort , fields , numericFilters}  = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name , $options:'i'}
    }
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$et',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        const filters = numericFilters.replace(regEx , (match)=>`-${operatorMap[match]}-`)
        const  options = ['price','rating']
        filters = filters.split(',').foreach((item)=>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
        })
    }


    // console.log(queryObject)

    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1)*limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products , nbHits:products.length})
}

module.exports = {getAllPoduct , getAllPoductsStatic}