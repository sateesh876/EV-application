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
            res.send(`station with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from cstations table are: \n', rows)

        })
    })
});

app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM cstation_details WHERE cstation_id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`station with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from stations table are: \n', rows)
        })
    })
});

app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { cstation_id, cstation_name, cs_latitude, cs_longitude, cs_address, cs_city, cs_district } = req.body

        connection.query('UPDATE cstation_details SET cstation_name = ?, cs_latitude = ?, cs_longitude = ?, cs_address = ?, cs_city = ?, cs_district = ? WHERE cstation_id = ?', [cstation_name, cs_latitude, cs_longitude, cs_address, cs_city, cs_district, cstation_id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`station with the name: ${cstation_name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`))