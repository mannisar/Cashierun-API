const connection = require('../configs/database')

module.exports = {
  createAccount: (data) => {
    const name = data.name;
    const email = data.email;
    const salt = data.salt;
    const password = data.password;
    const id_role = data.id_role;
    const image = data.image;
    return new Promise((resolve, reject) => {
      if (image === undefined) {
        connection.query(`INSERT INTO account (name, email, salt, password, id_role) VALUES('${name}', '${email}', '${salt}', '${password}', '${id_role}')`)
        setTimeout(() => {
          connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
            if (error) reject(new Error(error))
            return resolve(result)
          })
        }, 1000)
      } else {
        connection.query(`INSERT INTO account (name, email, salt, password, id_role, image) VALUES('${name}', '${email}', '${salt}', '${password}', '${id_role}', '${image}')`)
        setTimeout(() => {
          connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
            if (error) reject(new Error(error))
            return resolve(result)
          })
        }, 1000)
      }
    })
  },
  readAccount: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      if (id != null) {
        connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = $1', [id], (error, result) => {
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
    const id = data.id;
    const name = data.name;
    const email = data.email;
    const id_role = data.id_role;
    const image = data.image;
    return new Promise((resolve, reject) => {
      if (image === undefined) {
        connection.query(`UPDATE account SET name = '${name}', email = '${email}', id_role = '${id_role}' WHERE account.id = $1`, [id])
        setTimeout(() => {
          connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
            if (error) reject(new Error(error))
            return resolve(result)
          })
        }, 1000)
      } else {
        connection.query(`UPDATE account SET name = '${name}', email = '${email}', id_role = '${id_role}', image = '${image}' WHERE account.id = $1`, [id])
        setTimeout(() => {
          connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
            if (error) reject(new Error(error))
            return resolve(result)
          })
        }, 1000)
      }
    })
  },
  deleteAccount: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM account WHERE account.id = $1', [id])
      setTimeout(() => {
        connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role', (error, result) => {
          if (error) reject(new Error(error))
          connection.query('ALTER SEQUENCE account_id_seq RESTART')
          connection.query('UPDATE account SET id = DEFAULT')
          return resolve(result)
        })
      }, 1000)
    })
  },
  checkId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = $1', [id], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.email = $1', [email], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkPassword: (password) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.password = $1', [password], (error, result) => {
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
      connection.query('UPDATE account SET password = $1 WHERE account.id = $2', [password, id])
      connection.query('UPDATE account SET salt = $1 WHERE account.id = $2', [salt, id])
      connection.query('SELECT account.*, role.name AS role FROM account INNER JOIN role ON role.id = account.id_role WHERE account.id = $1', [id], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
