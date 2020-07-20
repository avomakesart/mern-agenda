const mysql = require('mysql')
const { promisify } = require('util')

const dbKeys = {
  user: 'alvarocastle',
  password: 'BLUEcat2518',
  host: 'localhost',
  port: 3306,
  database: 'perntodo',
}

const pool = mysql.createPool(dbKeys)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED')
    }
  }

  if (connection) connection.release()
  console.log('DB IS CONNECTED')
  return
})

pool.query = promisify(pool.query)

module.exports = pool
