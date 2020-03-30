const express = require('express')
const Route = express.Router()

const accountRouter = require('./routes/account')
const roleRouter = require('./routes/role')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const purchaseRouter = require('./routes/purchase')

Route
    .use('/account', accountRouter)
    .use('/role', roleRouter)
    .use('/product', productRouter)
    .use('/category', categoryRouter)
    .use('/purchase', purchaseRouter)
    .use('/upload', express.static('./upload'))

module.exports = Route