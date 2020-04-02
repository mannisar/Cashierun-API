const productModel = require('../models/product')
const funcHelpers = require('../helpers')
const { url } = require('../configs/mysql')

module.exports = {
  createProduct: async (request, response) => {
    try {
      if (!request.file || Object.keys(request.file).length === 0) {
        const {
          name,
          description,
          price,
          available
        } = request.body

        const data = {
          name,
          description,
          price,
          available,
          id_category: request.body.id_category || 1,
          date_added: new Date(),
          date_updated: new Date()
        }

        const result = await productModel.createProduct(data)
        return funcHelpers.response(response, 200, result)
      }

      const {
        name,
        description,
        price,
        available
      } = request.body

      const data = {
        name,
        description,
        price,
        available,
        id_category: request.body.id_category || 1,
        image: `${url}upload/${request.file.filename}`,
        date_added: new Date(),
        date_updated: new Date()
      }

      const result = await productModel.createProduct(data)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, error.message)
    }
  },
  readProduct: async (request, response) => {
    try {
      const id = request.params.id

      const paginateId = request.query.paginateId || 1
      const limit = request.query.limit || 25

      const product = request.query.product || ''
      const category = request.query.category || ''

      const sortBy = request.query.sortBy || 'id'
      const orderBy = request.query.orderBy || 'ASC'

      const data = {
        id,
        paginateId,
        limit,
        sortBy,
        orderBy
      }

      const result = await productModel.readProduct(product, category, data)
      const totalData = await productModel.countProduct(product, category)
      const amount = Math.ceil(totalData[0].totalData / limit)
      const paginateTab = { amount }

      funcHelpers.responsePagination(response, 200, result, parseInt(paginateId), paginateTab)
    } catch (error) {
      console.log(error)
      funcHelpers.customErrorResponse(response, 404, 'Read Product Failed!')
    }
  },
  updateProduct: async (request, response) => {
    try {
      if (!request.file || Object.keys(request.file).length === 0) {
        const id = request.params.id
        const {
          name,
          description,
          price,
          available
        } = request.body

        const data = {
          id,
          name,
          description,
          price,
          available,
          id_category: request.body.id_category || 1,
          date_updated: new Date()
        }

        const result = await productModel.updateProduct(data)
        return funcHelpers.response(response, 200, result)
      }

      const id = request.params.id
      const {
        name,
        description,
        price,
        available
      } = request.body

      const data = {
        id,
        name,
        description,
        price,
        available,
        id_category: request.body.id_category || 1,
        image: `${url}upload/${request.file.filename}`,
        date_updated: new Date()
      }

      const result = await productModel.updateProduct(data)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Update Product Failed!')
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const id = request.params.id
      const result = await productModel.deleteProduct(id)
      funcHelpers.response(response, 200, result)
    } catch (error) {
      console.log(error)
      funcHelpers.responseError(response, 404, 'Delete Product Failed!')
    }
  }
}
