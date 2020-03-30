const express = require('express');
const Route = express.Router();

const { middleware } = require("../auth");

const {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

const { uploadImages } = require('../controllers/upload');

Route
  .post('/', middleware, uploadImages, createProduct)
  .get('/', middleware, readProduct)
  .get('/:id', middleware, readProduct)
  .patch('/:id', middleware, uploadImages, updateProduct)
  .delete('/:id', middleware, deleteProduct)
  .get('/detail/:id', middleware, readProduct)

module.exports = Route;
