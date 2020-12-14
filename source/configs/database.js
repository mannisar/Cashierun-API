const { database } = require('./env');
const { Pool } = require('pg');

const connection = new Pool({
  user: database.user,
  host: database.host,
  database: database.database,
  password: database.password,
  port: database.port,
})

connection.connect((err) => {
  if (err) {
    console.log(`DATABASE CONNECTION FAILED!!`)
  } else {
    console.log(`DATABASE CONNECTION SUCCESSFUL!!`)
  }
})

module.exports = connection;