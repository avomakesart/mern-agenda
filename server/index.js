const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// Middleware
app.use(cors())
app.use(express.json())

// Routes

// create todo
app.post('/customers', async (req, res) => {
  try {
    const {
      customer_name,
      customer_lastname,
      customer_email,
      customer_phone,
      date_registered,
      time_registered,
      customer_schedule,
      comments,
    } = req.body

    const customerValues = [
      customer_name,
      customer_lastname,
      customer_email,
      customer_phone,
      date_registered,
      time_registered,
      customer_schedule,
      comments,
    ]

    const newCustomer = await pool.query(
      'INSERT INTO customers (customer_name, customer_lastname, customer_email, customer_phone, date_registered, time_registered, customer_schedule, comments) VALUES (?)',
      [customerValues]
    )

    res.json(newCustomer)
  } catch (err) {
    console.log(err.message)
  }
})

// get all todo
app.get('/customers', async (req, res) => {
  try {
    const newCustomer = await pool.query('SELECT * FROM customers')
    res.json(newCustomer)
  } catch (err) {
    console.log(err.message)
  }
})

// get a todo
app.get('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params
    const customer = await pool.query(
      'SELECT * FROM customers WHERE customer_id = ?',
      [id]
    )

    res.json(customer)
  } catch (err) {
    console.log(err.message)
  }
})

// update a todo
app.put('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      customer_name,
      customer_lastname,
      customer_email,
      customer_phone,
      date_registered,
      time_registered,
      customer_schedule,
      comments,
    } = req.body

    let nameSql = 'UPDATE customers SET customer_name = ? WHERE customer_id = ?'

    let lastnameSql =
      'UPDATE customers SET  customer_lastname = ? WHERE customer_id = ?'

    let emailSql =
      'UPDATE customers SET  customer_email = ? WHERE customer_id = ?'

    let phoneSql =
      'UPDATE customers SET  customer_phone = ? WHERE customer_id = ?'

    let dateSql =
      'UPDATE customers SET date_registered = ? WHERE customer_id = ?'

    let timeSql =
      'UPDATE customers SET time_registered = ? WHERE customer_id = ?'

    let scheduleSql =
      'UPDATE customers SET customer_schedule = ? WHERE customer_id = ?'

    let commentSql = 'UPDATE customers SET comments = ? WHERE customer_id = ?'

    await pool.query(
      nameSql,

      [customer_name, id]
    )

    await pool.query(
      lastnameSql,

      [customer_lastname, id]
    )

    await pool.query(
      emailSql,

      [customer_email, id]
    )

    await pool.query(
      phoneSql,

      [customer_phone, id]
    )

    await pool.query(
      dateSql,

      [date_registered, id]
    )

    await pool.query(
      timeSql,

      [time_registered, id]
    )

    await pool.query(
      scheduleSql,

      [customer_schedule, id]
    )

    await pool.query(
      commentSql,

      [comments, id]
    )

    res.json('Customer was updated')
  } catch (err) {
    console.log(err.message)
  }
})

// delete a todo
app.delete('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM customers WHERE customer_id = ?', [id])
    res.json('Todo was deleted')
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})
