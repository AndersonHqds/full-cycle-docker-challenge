const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people (name VARCHAR(30));`);
connection.query(`INSERT INTO people(name) VALUES ('Anderson');`);

connection.query("SELECT * FROM people", function (error, results, fields) {
    if (error) throw error;
    app.get('/', (req,res) => {
        res.send(`
            <h1>Full Cycle</h1>
            <ul>
                <li>${results[0].name}</li>
            </ul>
        `)
    })
});
connection.end()

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})