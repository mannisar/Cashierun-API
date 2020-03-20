const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    tablePurchase,
    chartPurchase,
    cardPurchase,
    purchase
} = require('../controllers/purchase')

Route
    .get('/history/table', tablePurchase)
    .get('/history/table/detail/:id', tablePurchase)
    .get('/history/chart', chartPurchase)
    .get('/history/card', cardPurchase)
    .post('/', purchase)

module.exports = Route