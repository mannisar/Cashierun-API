const connection = require('../configs/database')

module.exports = {
  createAccount: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE account AUTO_INCREMENT = 0')
      connection.query('INSERT INTO account SET ?', data)
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  readAccount: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      if (id != null) {
        connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = ?', id, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  updateAccount: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      connection.query('UPDATE account SET ? WHERE account.id = ?', [data, id])
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteAccount: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM account WHERE account.id = ?', id)
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE account DROP account.id')
        connection.query('ALTER TABLE account ADD account.id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  },
  checkId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = ?', id, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.email = ?', email, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkPassword: (password) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.password = ?', password, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  changePassword: (data) => {
    const id = data.id
    const salt = data.salt
    const password = data.password
    return new Promise((resolve, reject) => {
      connection.query('UPDATE account SET password = ? WHERE account.id = ?', [password, id])
      connection.query('UPDATE account SET salt = ? WHERE account.id = ?', [salt, id])
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = ?', id, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
