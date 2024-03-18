const productBLL = require('../BLL/productBLL')
const express = require('express')
const router = express.Router()


router.get('/', async(req, res) => {
    const products = await productBLL.getAllProducts()
    return res.status(200).json({products: products})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const product = await productBLL.getProductById(id)
    return res.status(200).json({product: product})
})


router.post('/', async(req, res) => {
    try {
        const product = req.body
        const status = await productBLL.addProduct(product)
        return res.status(200).json({msg: status})
    } catch (error) {
        return res.status(400).json({msg: 'Error', error: error})
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const product = req.body
    const status = await productBLL.updateProduct(id, product)
    return res.status(200).json({msg: status})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const status = await productBLL.deleteProduct(id)
    return res.status(200).json({msg: status})
})

module.exports = router