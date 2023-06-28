import express from 'express'
import { Router, Request, Response, Application } from 'express'
import checkUserMiddleware from '../middlewares/checkUserMiddleware.js'
import Product from '../models/product.js'
import utils from '../utils.js'

const router: Router = express.Router()
router.use(checkUserMiddleware)

router.post('/register', async (req: Request, res: Response) => {
    try {
        req.body.owner = req.body.userId
        const product = await Product.create(req.body)
        res.send({ 
            product,
            token: utils.generateToken({ id: req.body.userId }) 
        })
    } catch (err) { 
        res.status(400).send({ error: `${err}` }) 
    }
})

// router.patch('/update', async (req: Request, res: Response) => {
    
// })

export default (app: Application) => app.use('/product', router)