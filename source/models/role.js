const connection = require('../configs/database')

module.exports = {
  createRole: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE role AUTO_INCREMENT = 0')
      connection.query('INSERT INTO role SET ?', data)
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  readRole: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateRole: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      connection.query('UPDATE role SET ? WHERE role.id = ?', [data, id])
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteRole: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM role WHERE role.id = ?', id)
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE role DROP role.id')
        connection.query('ALTER TABLE role ADD role.id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
