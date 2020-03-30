const connection = require('../configs/database')

module.exports = {
  tablePurchase: (data) => {
    const id = data.id
    return new Promise((resolve, reject) => {
      if (id != null) {
        connection.query('SELECT purchase_detail.*, product.name AS product FROM purchase_detail INNER JOIN product ON product.id = purchase_detail.id_product WHERE purchase_detail.id_purchase = ?', id, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query('SELECT purchase.*, account.name AS account, DAYNAME(DATE) AS DAY, MONTHNAME(DATE) AS MONTH, YEAR(DATE) AS YEAR FROM purchase INNER JOIN account ON account.id = purchase.id_account', (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
    })
  },
  chartPurchase: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT YEAR(DATE) AS YEAR, MONTHNAME(DATE) AS MONTH, SUM(total) AS TOTAL FROM purchase GROUP BY YEAR(DATE), MONTH(DATE)', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  cardPurchase: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT (SELECT SUM(total) FROM purchase WHERE DATE(DATE) = DATE(NOW() - INTERVAL 0 DAY)) AS today, (SELECT COUNT(id) FROM purchase WHERE DAY(DATE) = DAY(CURDATE())) AS todayorder, (SELECT SUM(total) FROM purchase WHERE WEEK(DATE) = WEEK(CURDATE())) AS weekly, (SELECT COUNT(id) FROM purchase WHERE WEEK(DATE) = WEEK(CURDATE())) AS weeklyorder', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  purchase: (id, data, loop) => {
    const accountId = data.id_account
    const total = data.total
    const productId = data.id_product
    const price = data.price
    const quantity = data.quantity
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE product.id = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
        if (result.length > 0) {
          const checkId = result[0].id
          const checkAvailable = result[0].available - quantity
          if (checkAvailable >= 0) {
            connection.query('UPDATE product SET available = ? WHERE product.id = ?', [checkAvailable, checkId])
            if (loop === 0) { connection.query("INSERT INTO purchase (id, id_account, total) VALUES ('" + id + "', '" + accountId + "', '" + total + "')") }
            connection.query('ALTER TABLE purchase_detail AUTO_INCREMENT = 0')
            connection.query("INSERT INTO purchase_detail (id_purchase, id_product, price, quantity) VALUES ('" + id + "', '" + productId + "', '" + price + "', '" + quantity + "')", (error, result) => {
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
  }
}
