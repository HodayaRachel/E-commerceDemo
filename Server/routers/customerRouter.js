const express = require('express')
const router = express.Router()
const customerBLL = require('../BLL/customerBLL')


router.get('/', async(req, res) => {
    const customers = await customerBLL.getAllCustomers()
    return res.status(200).json({customers: customers})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const customer = await customerBLL.getCustomerById(id)
    return res.status(200).json({customer: customer})
})

router.get('/email/:email', async(req, res) => {
    const email = req.params.email
    const customer = await customerBLL.getCustomerByEmail(email)
    return res.status(200).json({customer: customer})
})

module.exports = router