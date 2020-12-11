const connection = require('../configs/database')

module.exports = {
  createRole: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO role (name) VALUES ('${data.name}')`)
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
    const name = data.name
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE role SET name = '${name}' WHERE role.id = $1`, [id])
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteRole: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM role WHERE role.id = $1', [id])
      connection.query('SELECT * FROM role', (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER SEQUENCE role_id_seq RESTART')
        connection.query('UPDATE role SET id = DEFAULT')
        resolve(result)
      })
    })
  }
}
