const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json('Error fetching tasks');
    }
});

router.post('/', async (req, res) => {
    try {
        const input = req.body['title'];
        const result = await pool.query('INSERT INTO tasks (title) VALUES($1) RETURNING *', [input]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Error creating task');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const completed = req.body['completed'];
        const result = await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Error updating task');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Error deleting task');
    }
});

module.exports = router;

