const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')

Route
    .post('/', createCategory)
    .get('/', readCategory)
    .patch('/:id', updateCategory)
    .delete('/:id', deleteCategory)
    .get('/:name', readCategory)

module.exports = Route