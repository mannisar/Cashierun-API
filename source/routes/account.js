const express = require('express')
const Route = express.Router()

const {
    createAccount,
    readAccount,
    updateAccount,
    deleteAccount,
    login,
    changePassword
} = require('../controllers/account')

const { uploadImages } = require('../controllers/upload');

Route
    .post('/', uploadImages, createAccount)
    .get('/', readAccount)
    .patch('/:id', uploadImages, updateAccount)
    .delete('/:id', deleteAccount)
    .get('/detail/:id', readAccount)
    .post('/login', login)
    .patch('/password/:id', changePassword)

module.exports = Route