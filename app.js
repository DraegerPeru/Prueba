const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//My SQL
//const connection = mysql.createConnection({
//    host: 'us-cdbr-east-04.cleardb.com',
//    user: 'bced8b2864e469',
//    password: 'd1699e98',
//    database: 'heroku_a4e2a197d807645'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'remoto',
    password: 'Remoto$1',
    database: 'DraegerPeru'
});

//Clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM CLIENTES';

    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        } else{
            res.send('no hay resultados');
        }
    }) 
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO CLIENTES SET ?';
    const objClientes = {
        name: req.body.name,
        email: req.body.email
    }

    connection.query(sql, objClientes, error=>{
        if(error) throw error;
        res.send('Cliente creado');
    }) 
});

app.get('/home', (req, res) => {
    res.send('Esta es la segunda prueba con heruko');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor levantado en el puerto 3000');
});

connection.connect(error => {
    if(error) throw error;
    console.log('La base de datos esta corriendo');
});