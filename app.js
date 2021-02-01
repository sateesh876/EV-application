const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs_ex'
})


app.get('',(req, res) => {
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from beers',(err, rows)=>{
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/:id',(req, res) => {
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from beers WHERE id=?',[req.params.id], (err, rows) =>{
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.delete('/:id',(req, res) => {
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('DELETE from beers WHERE id=?',[req.params.id], (err, rows) =>{
            connection.release()

            if(!err) {
                res.send(`charging station with record id ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})


//Listen on environment port or 5000
app.listen(port, () => console.log('Listen on port ${port}'))