const express = require('express');
require('dotenv').config();
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

app.get('/api/question-sets', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM question_sets');
  res.json(rows);
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
  
    try {
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password); // Verify password
        if (match) {
          // Passwords match
          res.json({ message: "Login successful" }); // Implement JWT or session management as needed
        } else {
          // Passwords do not match
          res.status(400).json({ error: "Invalid credentials" });
        }
      } else {
        // User not found
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
// Add more endpoints as needed

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
