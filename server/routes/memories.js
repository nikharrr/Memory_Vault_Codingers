const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all memories
router.get('/',async (req,res) => {
  try {
    const result = await db.query('SELECT * FROM memories ORDER BY memory_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a memory
router.post('/',async (req,res) => {
  const {patient_id,title,descrip,memory_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO memories (patient_id, title, descrip, memory_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [patient_id,title,descrip,memory_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get memory by patient_id
router.get('/patient/:id',async (req,res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM Memories WHERE patient_id = $1',[id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
