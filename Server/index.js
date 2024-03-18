const express = require('express')
const cors = require('cors')

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

// connection db
require('./config/configDB')

// Routers
const orderRouter = require('./routers/orderRouter')
const productRouter = require('./routers/productRouter')
const customerRouter = require('./routers/customerRouter')

app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)


app.listen(port, () => {
    console.log(`server is listening port ${port}`)
})