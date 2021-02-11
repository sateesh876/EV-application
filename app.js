import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import usersRoutes from './routes/users.js';
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use('/users', usersRoutes);
//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'devices'
})

app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from cstation_details', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from devices table are: \n', rows)
        })
    })
})



app.get('/:name', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM cstation_details WHERE cstation_name = ?', [req.params.name], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from stations table are: \n', rows)
        })
    })
});

app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO cstation_details SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Station with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from cstation table are:11 \n', rows)

        })
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`))