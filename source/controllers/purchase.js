const purchaseModel = require('../models/purchase')
const funcHelpers = require('../helpers')

module.exports = {
    tablePurchase: async (request, response) => {
        try {
            const id = request.params.id
            const data = {
                id
            }
            const result = await purchaseModel.tablePurchase(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Table Purchase Failed!')
        }
    },
    chartPurchase: async (request, response) => {
        try {
            const orderBy = request.query.orderBy
            orderBy = typeof orderBy !== 'undefined' ? orderBy : "week"

            const result = await purchaseModel.chartPurchase(orderBy)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Chart Purchase Failed!')
        }
    },
    cardPurchase: async (request, response) => {
        try {
            const result = await purchaseModel.cardPurchase()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Card Purchase Failed!')
        }
    },
    purchase: async (request, response) => {
        try {
            const purchase = request.body
            var loop = 0

            await purchase.product.map(event => {
                const data = {
                    id: purchase.id,
                    id_account: purchase.id_account,
                    total: purchase.total,
                    id_product: event.id,
                    price: event.price,
                    quantity: event.quantity
                }
                purchaseModel.purchase(data, loop)
                loop++
            })

            funcHelpers.response(response, 200, 'Purchase Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.responseError(response, 404, 'Purchase Failed!')
        }
    },
}