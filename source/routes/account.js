const express = require('express')
const Route = express.Router()

const { middleware } = require("../auth");

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
    .get('/', middleware, readAccount)
    .patch('/:id', middleware, uploadImages, updateAccount)
    .delete('/:id', middleware, deleteAccount)
    .get('/detail/:id', middleware, readAccount)
    .post('/login', login)
    .patch('/password/:id', middleware, changePassword)

module.exports = Route