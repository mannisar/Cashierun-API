const accountModel = require('../models/account')
const funcHelpers = require('../helpers')
const JWT = require('jsonwebtoken')
const { JWT_KEY, url } = require('../configs/mysql')

module.exports = {
  createAccount: async (request, response) => {
    const checkEmail = await accountModel.checkEmail(request.body.email)
    const dataAccount = checkEmail.rows[0]

    const salt = funcHelpers.generateSalt(18)
    const hashPassword = funcHelpers.setPassword(request.body.password, salt)

    if (dataAccount === undefined) {
      if (!request.file || Object.keys(request.file).length === 0) {
        const {
          name,
          email
        } = request.body

        const data = {
          name,
          email,
          salt: hashPassword.salt,
          password: hashPassword.passwordHash,
          id_role: request.body.id_role || 4,
          image: null,
          date_added: new Date(),
          date_updated: new Date()
        }

        const result = await accountModel.createAccount(data)
        return funcHelpers.response(response, 200, result.rows)
      }

      const {
        name,
        email
      } = request.body

      const data = {
        name,
        email,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        id_role: request.body.id_role || 4,
        image: `${url}upload/${request.file.filename}`,
        date_added: new Date(),
        date_updated: new Date()
      }

      const result = await accountModel.createAccount(data)
      funcHelpers.response(response, 200, result.rows)
    } else {
      return funcHelpers.responseErrorAccount(response, 404, 'Your Email is Already Registered!')
    }
  },
  readAccount: async (request, response) => {
    try {
      const id = request.params.id
      const data = {
        id
      }
      const result = await accountModel.readAccount(data)
      funcHelpers.response(response, 200, result.rows)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Read Account Failed!')
    }
  },
  updateAccount: async (request, response) => {
    try {
      if (!request.file || Object.keys(request.file).length === 0) {
        const id = request.params.id

        const {
          name,
          email
        } = request.body

        const data = {
          id,
          name,
          email,
          id_role: request.body.id_role || 4,
          date_updated: new Date()
        }

        const result = await accountModel.updateAccount(data)
        return funcHelpers.response(response, 200, result.rows)
      }

      const id = request.params.id

      const {
        name,
        email
      } = request.body

      const data = {
        id,
        name,
        email,
        id_role: request.body.id_role || 4,
        image: `${url}upload/${request.file.filename}`,
        date_updated: new Date()
      }

      const result = await accountModel.updateAccount(data)
      funcHelpers.response(response, 200, result.rows)
    } catch (error) {
      console.log(error)
      funcHelpers.cumstomErrorResponse(response, 404, 'Update Account Failed!')
    }
  },
  deleteAccount: async (request, response) => {
    try {
      const id = request.params.id
      const result = await accountModel.deleteAccount(id)
      funcHelpers.response(response, 200, result.rows)
    } catch (error) {
      console.log(error)
      funcHelpers.cumstomErrorResponse(response, 404, 'Delete Account Failed!')
    }
  },
  login: async (request, response) => {
    const checkEmail = await accountModel.checkEmail(request.body.email)
    const dataAccount = checkEmail.rows[0]

    if (dataAccount !== undefined) {
      const data = {
        email: request.body.email,
        password: request.body.password
      }

      const hashPassword = funcHelpers.setPassword(data.password, dataAccount.salt)
      if (hashPassword.passwordHash === dataAccount.password) {
        const token = JWT.sign({
          email: dataAccount.email,
          id: dataAccount.id
        }, JWT_KEY, {
          expiresIn: '30m'
        })

        delete dataAccount.salt
        delete dataAccount.password

        dataAccount.token = token

        funcHelpers.response(response, 200, dataAccount)
      } else {
        return funcHelpers.responseErrorAccount(response, 404, 'Password is Incorrect!')
      }
    } else {
      return funcHelpers.responseErrorAccount(response, 404, 'Email is Incorrect!')
    }
  },
  changePassword: async (request, response) => {
    try {
      const id = request.params.id
      const salt = funcHelpers.generateSalt(18)
      const hashPassword = funcHelpers.setPassword(request.body.password, salt)

      const data = {
        id,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        date_updated: new Date()
      }

      await accountModel.changePassword(data)
      funcHelpers.response(response, 200, 'Change Password Successful!')
    } catch (error) {
      console.log(error)
      funcHelpers.responseErrorAccount(response, 404, 'Change Password Failed!')
    }
  }
}
