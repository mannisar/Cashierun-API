const express = require('express')
const Route = express.Router()

// check token.
// const { middleware } = require("../auth");

const {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product')

const { uploadImages } = require('../controllers/upload')

Route
  .post('/', uploadImages, createProduct)
  .get('/', readProduct)
  .get('/:id', readProduct)
  .patch('/:id', uploadImages, updateProduct)
  .delete('/:id', deleteProduct)
  .get('/detail/:id', readProduct)

module.exports = Route
