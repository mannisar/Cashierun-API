const express = require('express')
const Route = express.Router()

const { middleware } = require("../auth");

const {
    createRole,
    readRole,
    updateRole,
    deleteRole
} = require('../controllers/role')

Route
    .post('/', middleware, createRole)
    .get('/', middleware, readRole)
    .patch('/:id', middleware, updateRole)
    .delete('/:id', middleware, deleteRole)

module.exports = Route