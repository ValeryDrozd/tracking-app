const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
  })
);

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_db',
});

// connect to database
connection.connect();

// login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({
        status: 'success',
        user: results[0],
      });
    } else {
      res.send({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
  });
});

// registration route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({
        status: 'error',
        message: 'Already registered',
      });
    } else {
      const query =
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      connection.query(query, [name, email, password], (error, results) => {
        if (error) throw error;
        res.send({
          status: 'success',
          user: {
            id: results.insertId,
            name,
            email,
          },
        });
      });
    }
  });
});
app.post('/addcompany', (req, res) => {
  const { text, search, userid } = req.body;
  const query = 'INSERT INTO companies (text, search, userid) VALUES (?, ?, ?)';
  connection.query(query, [text, search, userid], (error) => {
    if (error) throw error;
    const sql = 'SELECT * FROM companies WHERE userid = ?';

    connection.query(sql, [userid], (error, results) => {
      if (error) {
        res.send({ error });
      } else {
        res.send({ companies: results });
      }
    });
  });
});
app.post('/getcompany', (req, res) => {
  const { userid } = req.body;
  const sql = 'SELECT * FROM companies WHERE userid = ?';

  connection.query(sql, [userid], (error, results) => {
    if (error) {
      res.send({ error });
    } else {
      res.send({ companies: results });
    }
  });
});

app.post('/delete', (req, res) => {
  const { id, userid } = req.body;
  const query = 'DELETE FROM companies WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.send({ error });
    } else {
      const sql = 'SELECT * FROM companies WHERE userid = ?';

      connection.query(sql, [userid], (error, results) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({ companies: results });
        }
      });
    }
  });
});

// start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
