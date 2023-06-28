import express from 'express';
import Product from '../models/product.js';
import utils from '../utils.js';
const router = express.Router();
router.get('/ip', async (req, res) => {
    const ip = await utils.getIp();
    return res.send(ip);
});
router.get('/nearProducts', async (req, res) => {
    let pageParam = utils.getURLInternalParams(req, 'page');
    let page = parseInt(pageParam || '');
    if (!page)
        page = 0;
    let nextPage = page + 1;
    try {
        // const { ip } = await utils.getIp()
        // const location = await utils.getLocationWithIP(ip)
        const location = {
            city: "Florianópolis"
        };
        const { city } = location;
        const skip = page * 20;
        const products = await Product.find({ city }).skip(skip).limit(20);
        if (!products.length)
            nextPage = 0;
        return res.status(200).send({ products, nextPage });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: `${err}` });
    }
});
export default (app) => app.use('/get', router);
