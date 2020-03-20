const connection = require('../configs/database')

module.exports = {
    tablePurchase: (data) => {
        const id = data.id
        return new Promise((resolve, reject) => {
            if (id != null) {
                connection.query('SELECT purchase_detail.*, purchase.id_account, account.name AS account, product.name AS product FROM purchase_detail INNER JOIN purchase ON purchase.id = purchase_detail.id_purchase INNER JOIN account ON account.id = purchase.id_account INNER JOIN product ON product.id = purchase_detail.id_product WHERE purchase.id = ?', id, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query('SELECT purchase.*, account.name AS account FROM purchase INNER JOIN account ON account.id = purchase.id_account', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
    chartPurchase: (data) => {
        const urlget = 'SELECT *,SUM(total) AS totalcount,DAYOFWEEK(DATE) AS today, DAYNAME(DATE) AS DAYNAME,MONTHNAME(DATE) AS MONTHNAME,YEAR(DATE) AS YEAR, EXTRACT(MONTH FROM DATE) AS MONTH, EXTRACT(DAY FROM DATE) AS WEEK, EXTRACT(YEAR FROM DATE) AS YEAR FROM purchase ORDER BY ' + data;
        return new Promise((resolve, reject) => {
            connection.query(urlget, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    cardPurchase: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT (SELECT SUM(total) FROM purchase WHERE DATE(DATE) = DATE(NOW() - INTERVAL 1 DAY)) AS yesterday, (SELECT SUM(total) FROM purchase WHERE DATE(DATE) = DATE(NOW() - INTERVAL 0 DAY)) AS daynow, (SELECT SUM(total) FROM purchase WHERE YEAR(DATE) = YEAR(CURDATE()) -1) AS yearlast , (SELECT SUM(total) FROM purchase WHERE YEAR(DATE) = YEAR(CURDATE())) AS yearnow, (SELECT COUNT(id) FROM purchase WHERE WEEK(DATE) = WEEK(CURDATE())) AS weeknow, (SELECT COUNT(id) FROM purchase WHERE DAY(DATE) = DAY(CURDATE())) AS dayordernnow, (SELECT COUNT(id) FROM purchase WHERE WEEK(DATE) = WEEK(CURDATE()) -1 ) AS lastweek", (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    purchase: (data, loop) => {
        const id = data.id
        const id_account = data.id_account
        const total = data.total
        const id_product = data.id_product
        const price = data.price
        const quantity = data.quantity
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE product.id = ?", id_product, (error, result) => {
                if (error) reject(new Error(error))
                if (result.length > 0) {
                    let checkId = result[0].id
                    let checkQuantity = result[0].quantity - quantity
                    if (checkQuantity >= 0) {
                        connection.query("UPDATE product SET quantity = ? WHERE product.id = ?", [checkQuantity, checkId])
                        if (loop == 0) { connection.query("INSERT INTO purchase (id, id_account, total) VALUES ('" + id + "', '" + id_account + "', '" + total + "')") }
                        connection.query("ALTER TABLE purchase_detail AUTO_INCREMENT = 0")
                        connection.query("INSERT INTO purchase_detail (id_purchase, id_product, price, quantity) VALUES ('" + id + "', '" + id_product + "', '" + price + "', '" + quantity + "')", (error, result) => {
                            if (error) reject(new Error(error))
                            resolve(result)
                        })
                    } else {
                        console.log('Cannot Reduce Stock Product, Below  0 (-1, -2, -3)!')
                        reject(new Error(error))
                    }
                } else {
                    console.log('Id Product Not Found!')
                    reject(new Error(error))
                }
            })
        })
    },
}