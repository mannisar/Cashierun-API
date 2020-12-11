const connection = require('../configs/database')

module.exports = {
  createProduct: (data) => {
    const name = data.name
    const description = data.description
    const price = data.price
    const available = parseInt(data.available)
    const categoryId = parseInt(data.id_category)
    const image = data.image
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE product.name = $1', [name], (error, result) => {
        if (result.length > 0) {
          connection.query('UPDATE product SET available = $1 WHERE product.id = $2', [result.rows[0].available + available, result.rows[0].id])
          connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
            if (error) reject(new Error(error))
            resolve(result)
          })
        } else {
          connection.query('SELECT * FROM category WHERE category.id = $1', [categoryId], (error, result) => {
            if (categoryId === result.rows[0].id) {
              if (image === undefined) {
                connection.query(`INSERT INTO product (name, description, price, available, id_category) VALUES('${name}', '${description}', '${price}', '${available}', '${categoryId}')`)
                connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
                  if (error) reject(new Error(error))
                  resolve(result)
                })
              } else {
                connection.query(`INSERT INTO product (name, description, price, available, id_category, image) VALUES('${name}', '${description}', '${price}', '${available}', '${categoryId}', '${image}')`)
                connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
                  if (error) reject(new Error(error))
                  resolve(result)
                })
              }
            } else {
              reject(new Error(error))
            }
          })
        }
        if (error) reject(new Error(error))
      })
    })
  },
  readProduct: (id, product, category, sortBy, limit, paginateId) => {
    return new Promise((resolve, reject) => {
      if (id != null) {
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category WHERE product.id = $1', [id], (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else if (product != null || category != null || sortBy != null || paginateId != null || limit != null) {
        const paginateStart = ((paginateId * limit) - limit)
        connection.query(`SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category WHERE product.name ILIKE '%${product}%' AND category.name ILIKE '%${category}%' ORDER BY ${sortBy} ASC LIMIT ` + limit + 'OFFSET ' + paginateStart, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  updateProduct: (data) => {
    const id = data.id
    const name = data.name
    const description = data.description
    const price = data.price
    const available = parseInt(data.available)
    const categoryId = parseInt(data.id_category)
    const image = data.image
    return new Promise((resolve, reject) => {
      if (image === undefined) {
        connection.query(`UPDATE product SET name = '${name}', description = '${description}', price = '${price}', available = '${available}', id_category = '${categoryId}' WHERE product.id = $1`, [id])
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query(`UPDATE product SET name = '${name}', description = '${description}', price = '${price}', available = '${available}', id_category = '${categoryId}', image = '${image}' WHERE product.id = $1`, [id])
        connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE product.id = $1', [id])
      connection.query('SELECT product.*, category.name AS category FROM product INNER JOIN category ON category.id = product.id_category', (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER SEQUENCE product_id_seq RESTART')
        connection.query('UPDATE product SET id = DEFAULT')
        resolve(result)
      })
    })
  }
}
