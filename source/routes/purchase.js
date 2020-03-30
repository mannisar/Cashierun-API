const express = require('express')
const Route = express.Router()

// check token.
// const { middleware } = require("../auth");

const {
  tablePurchase,
  chartPurchase,
  cardPurchase,
  purchase
} = require('../controllers/purchase')

Route
  .get('/history/table', tablePurchase)
  .get('/history/table/:id', tablePurchase)
  .get('/history/chart', chartPurchase)
  .get('/history/card', cardPurchase)
  .post('/', purchase)

module.exports = Route
