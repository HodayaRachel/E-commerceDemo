const express = require('express')
const router = express.Router()
const orderBLL = require('../BLL/orderBLL')


router.get('/', async(req, res) => {
    const orders = await orderBLL.getAllOrders()
    return res.status(200).json({orders: orders})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const order = await orderBLL.getOrderById(id)
    return res.status(200).json({order: order})
})

router.post('/', async(req, res) => {
    try {
        const order = req.body
        const status = await orderBLL.addOrder(order)
        return res.status(200).json({msg: status})
    } catch (error) {
        return res.status(400).json({msg: 'Error', error: error})
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const order = req.body
    const status = await orderBLL.updateOrder(id, order)
    return res.status(200).json({msg: status})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const status = await orderBLL.deleteOrder(id)
    return res.status(200).json({msg: status})
})

module.exports = router