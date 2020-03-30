const connection = require('../configs/database')

module.exports = {
  countProduct: (product, category) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS totalData, category.name AS category FROM product LEFT JOIN category ON product.id_category = category.id WHERE product.name LIKE "%' + product + '%" AND category.name LIKE "%' + category + '%"', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result[0].totalData)
      })
    })
  },
  createProduct: (data) => {
    const name = data.name
    const available = data.available
    const categoryId = data.id_category
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE product AUTO_INCREMENT = 0')
      connection.query('SELECT * FROM product WHERE product.name = ?', name, (error, result) => {
        if (result.length > 0) {
          connection.query('UPDATE product SET available = ? WHERE product.id = ?', [result[0].available + parseInt(available), result[0].id])
          connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
            if (error) reject(new Error(error))
            resolve(result)
          })
        } else {
          connection.query('SELECT * FROM category WHERE category.id = ?', categoryId, (error, result) => {
            if (categoryId === result[0].id) {
              connection.query('INSERT INTO product SET ?', data)
              connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
              })
            } else {
              reject(new Error(error))
            }
          })
        }
        if (error) reject(new Error(error))
      })
    })
  },
  readProduct: (product, category, data) => {
    const id = data.id
    const paginateId = data.paginateId
    const limit = data.limit
    const sortBy = data.sortBy
    const orderBy = data.orderBy
    return new Promise((resolve, reject) => {
      if (id != null) {
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category WHERE product.id = ?', id, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else if (product != null || category != null || paginateId != null || limit != null || sortBy != null || orderBy != null) {
        const paginateStart = ((paginateId * limit) - limit)
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category WHERE product.name LIKE "%' + product + '%" AND category.name LIKE "%' + category + '%" ORDER BY ' + sortBy + ' ' + orderBy + ' LIMIT ' + paginateStart + ',' + limit, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  updateProduct: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE product.id = ?', [data, id])
      connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE product.id = ?', id)
      connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE product DROP product.id')
        connection.query('ALTER TABLE product ADD product.id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
