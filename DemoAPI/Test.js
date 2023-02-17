

const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const mysql = require('mysql3')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'thuephim'
}) 

connection.connect()

app.get('/rent', (request, response) => {
    connection.query("SELECT * FROM `thuePhim`", (err,data) => {
        if (err) {
            response.send("Co loi")
        } else {
            response.send(data)
        }
    })
})
 
app.listen(port, () => {
    console.log(`Server app listening on port 3000`)
  })