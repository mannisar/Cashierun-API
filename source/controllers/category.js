const categoryModel = require('../models/category')
const funcHelpers = require('../helpers')

module.exports = {
    createCategory: async (request, response) => {
        try {
            const {
                name
            } = request.body

            const data = {
                name
            }

            const result = await categoryModel.createCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Create Category Failed!')
        }
    },
    readCategory: async (request, response) => {
        try {
            const name = request.params.name

            const data = {
                name
            }

            const result = await categoryModel.readCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Category Failed!')
        }
    },
    updateCategory: async (request, response) => {
        try {
            const id = request.params.id
            const {
                name
            } = request.body

            const data = {
                id,
                name
            }

            const result = await categoryModel.updateCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Update Category Failed!')
        }
    },
    deleteCategory: async (request, response) => {
        try {
            const id = request.params.id
            const result = await categoryModel.deleteCategory(id)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Delete Category Failed!')
        }
    }
}