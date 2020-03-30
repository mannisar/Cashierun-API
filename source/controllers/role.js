const roleModel = require('../models/role')
const funcHelpers = require('../helpers')

module.exports = {
  createRole: async (request, response) => {
    try {
      const {
        name
      } = request.body

      const data = {
        name
      }

      const result = await roleModel.createRole(data)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Create Role Failed!')
    }
  },
  readRole: async (request, response) => {
    try {
      const result = await roleModel.readRole()
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.customErrorResponse(response, 404, 'Read Role Failed!')
    }
  },
  updateRole: async (request, response) => {
    try {
      const id = request.params.id
      const {
        name
      } = request.body

      const data = {
        id,
        name
      }

      const result = await roleModel.updateRole(data)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Update Role Failed!')
    }
  },
  deleteRole: async (request, response) => {
    try {
      const id = request.params.id
      const result = await roleModel.deleteRole(id)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Delete Role Failed!')
    }
  }
}
