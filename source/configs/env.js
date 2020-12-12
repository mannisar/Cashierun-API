require('dotenv/config')

// @ENV
// perintah command prompt untuk pindah env => export NODE_ENV=development atau export NODE_ENV=production
const env = process.env.NODE_ENV
switch (env) {
  case 'development':
    require('dotenv').config({ path: process.cwd() + '/.env.development' })
    break;
  case 'production':
    require('dotenv').config({ path: process.cwd() + '/.env.production' })
    break;
  default:
    break;
}

// @DATABASE
module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  port: process.env.PORT,
  url: process.env.URL,
  JWT_KEY: process.env.JWT_KEY
}