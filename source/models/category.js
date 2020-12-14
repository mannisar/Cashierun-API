const connection = require('../configs/database')

module.exports = {
  createCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO category (name) VALUES ('${data.name}')`)
      setTimeout(() => {
        connection.query('SELECT * FROM category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }, 1000)
    })
  },
  readCategory: (data) => {
    const name = data.name
    return new Promise((resolve, reject) => {
      if (name != null) {
        connection.query(`SELECT * FROM category WHERE category.name like '%${name}%'`, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query('SELECT * FROM category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  updateCategory: (data) => {
    const id = data.id
    const name = data.name
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE category SET name = '${name}' WHERE category.id = $1`, [id])
      setTimeout(() => {
        connection.query('SELECT * FROM category', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }, 1000)
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE category.id = $1', [id])
      setTimeout(() => {
        connection.query('SELECT * FROM category', (error, result) => {
          if (error) reject(new Error(error))
          connection.query('ALTER SEQUENCE category_id_seq RESTART')
          connection.query('UPDATE category SET id = DEFAULT')
          resolve(result)
        })
      }, 1000)
    })
  }
}