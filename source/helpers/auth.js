const JWT = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../configs/mysql')

module.exports = {
    authentication: (request, response, next) => {
        const accountId = request.headers['id']
        const headerToken = request.headers.token
        if (headerToken === undefined) {
            return response.status(404).json({
                status: 404,
                message: "Please Provide Token!"
            })
        } else {
            request.token = headerToken
            request.accountId = accountId
            next()
        }
    },
    authorization: (request, response, next) => {
        const token = request.token
        const accountId = request.accountId
        JWT.verify(token, JWT_KEY, (error, decoded) => {
            if (error && error.name === 'TokenExpiredError') return response.status(404).json({
                status: 404,
                message: "Token Expired!"
            })
            if (error && error.name === 'JsonWebTokenError') return response.status(404).json({
                status: 404,
                message: "Token Error!"
            })
            if (error && error.name === 'SyntaxError') return response.status(404).json({
                status: 404,
                message: "Token Wrong!"
            })
            if (parseInt(accountId) !== parseInt(decoded.id)) return response.status(404).json({
                status: 404,
                message: "You\'re Unauthorized!"
            })
            next()
        })
    }
}