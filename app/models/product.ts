import mongo from '../database/index.js'
import utils from '../utils.js'

const productSchema = new mongo.Schema({
    name: {
        type: String,        
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

productSchema.pre('save', async function (next) {
    type Location = {
        bairro: string,
        localidade: string,
        uf: string
    }
    try {
        const location = await utils.getLocationWithCEP(this.cep) as Location
        this.neighborhood = location.bairro
        this.city = location.localidade
        this.state = location.uf

        this.date = new Date(this.date).toUTCString()
    } catch (err) {
        console.log(err)
    }
    next()
})

const Product = mongo.model('products', productSchema)

export default Product
