const mysql = require ('mysql2')
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORDK,
})

module.exports = pool.promise()