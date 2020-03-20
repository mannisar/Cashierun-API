const connection = require('../configs/database')

module.exports = {
    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE category AUTO_INCREMENT = 0')
            connection.query('INSERT INTO category SET ?', data)
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    readCategory: (data) => {
        const name = data.name
        return new Promise((resolve, reject) => {
            if (name != null) {
                connection.query('SELECT * FROM category WHERE category.name like "%' + name + '%"', (error, result) => {
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
        return new Promise((resolve, reject) => {
            connection.query('UPDATE category SET ? WHERE category.id = ?', [data, id])
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM category WHERE category.id = ?', data)
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                connection.query('ALTER TABLE category DROP category.id')
                connection.query('ALTER TABLE category ADD category.id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
                resolve(result)
            })
        })
    }
}