const { database } = require('./mysql')
const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((error) => {
    if (error) {
        console.log(`DATABASE CONNECTION FAILED: ${database.database}`)
    } else {
        console.log(`DATABASE CONNECTION SUCCESSFUL: ${database.database}`)
    }
})

module.exports = connection