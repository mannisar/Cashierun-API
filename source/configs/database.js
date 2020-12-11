// const { database } = require('./mysql')
// const mysql = require('mysql')

// const connection = mysql.createConnection(database)

// connection.connect((error) => {
//   if (error) {
//     console.log(`DATABASE CONNECTION FAILED: ${database.database}`)
//   } else {
//     console.log(`DATABASE CONNECTION SUCCESSFUL: ${database.database}`)
//   }
// })

// module.exports = connection

const { Pool } = require('pg');
const connection = new Pool({
  user: 'kovvbqhaafxcnb',
  host: 'ec2-3-90-124-60.compute-1.amazonaws.com',
  database: 'd7nluncgcq7bki',
  password: 'e7beeda2e7e958391ce3f524aa65c7d6a3ae4202ae572820af6012c035234af1',
  port: 5432,
})

connection.connect((err) => {
  if (err) {
    console.log(`DATABASE CONNECTION FAILED!!`)
  } else {
    console.log(`DATABASE CONNECTION SUCCESSFUL!!`)
  }
})

module.exports = connection;