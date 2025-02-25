const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

app.use(cors());

// Test route to check database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows); // Returns the current timestamp from the database
    } catch (err) {
        console.error(err);
        res.status(500).send("Database connection failed");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
