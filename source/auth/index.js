const JWT = require('jsonwebtoken')
const {
  JWT_KEY
} = require('../configs/mysql')

const checkAuth = (request, response, next) => {
  const id = request.headers.id
  const headerToken = request.headers.token

  if (headerToken === undefined) {
    return response.status(404).json({
      status: 404,
      message: 'Please Provide Token!'
    })
  } else if (headerToken !== undefined) {
    request.id = id
    request.token = headerToken
    next()
  } else {
    JWT.verify(request.token, JWT_KEY, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        return response.status(404).json({
          status: 404,
          message: 'Token Expired!'
        })
      }
      if (error && error.name === 'JsonWebTokenError') {
        return response.status(404).json({
          status: 404,
          message: 'Token Error!'
        })
      }
      if (error && error.name === 'SyntaxError') {
        return response.status(404).json({
          status: 404,
          message: 'Token Wrong!'
        })
      }
      if (parseInt(request.id) !== parseInt(decoded.id)) {
        return response.status(404).json({
          status: 404,
          message: "You're Unauthorized!"
        })
      }
      next()
    })
  }
}

module.exports = {
  middleware: checkAuth
}
