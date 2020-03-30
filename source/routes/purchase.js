const express = require('express')
const Route = express.Router()

const { middleware } = require("../auth");

const {
    tablePurchase,
    chartPurchase,
    cardPurchase,
    purchase
} = require('../controllers/purchase')

Route
    .get('/history/table', middleware, tablePurchase)
    .get('/history/table/:id', middleware, tablePurchase)
    .get('/history/chart', middleware, chartPurchase)
    .get('/history/card', middleware, cardPurchase)
    .post('/', purchase)

module.exports = Route