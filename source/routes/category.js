const express = require('express')
const Route = express.Router()

const { middleware } = require("../auth");

const {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')

Route
    .post('/', middleware, createCategory)
    .get('/', middleware, readCategory)
    .patch('/:id', middleware, updateCategory)
    .delete('/:id', middleware, deleteCategory)
    .get('/:name', middleware, readCategory)

module.exports = Route