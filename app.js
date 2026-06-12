const express = require('express');
const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

// Create connection to MySQL
AWS.config.update({ region: 'eu-central-1' });

(async () => {
  let password = 'password1';
  

  let conn;
  try {
    conn = await mysql.createConnection({
      host: 'testdb.ctueoqes4434.eu-central-1.rds.amazonaws.com',
      port: 3306,
      database: 'mysql',
      user: 'admin',
      password,
      ssl: { rejectUnauthorized: false, ca: require('fs').readFileSync('./global-bundle.pem') }
    });

    const [rows] = await conn.execute('SELECT VERSION() AS v');
    console.log(rows[0].v);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    if (conn) await conn.end();
  }
})().catch(console.error);

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS items(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Items table created...');
    });
});

// Insert an item
app.post('/addItem', (req, res) => {
    let item = { name: req.body.name };
    let sql = 'INSERT INTO items SET ?';
    db.query(sql, item, (err, result) => {
        if (err) throw err;
        res.send('Item added...');
    });
});

// Get all items
app.get('/getItems', (req, res) => {
    let sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single item by ID
app.get('/getItem/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update an item
app.put('/updateItem/:id', (req, res) => {
    let newName = req.body.name;
    let sql = `UPDATE items SET name = ? WHERE id = ?`;
    db.query(sql, [newName, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Item updated...');
    });
});

// Delete an item
app.delete('/deleteItem/:id', (req, res) => {
    let sql = `DELETE FROM items WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Item deleted...');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
