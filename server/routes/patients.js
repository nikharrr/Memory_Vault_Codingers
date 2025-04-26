const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM patients ORDER BY full_name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a patient
router.post('/', async (req, res) => {
  const {full_name, birth_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO patients ( full_name, birth_date) VALUES ($1, $2 ) RETURNING *',
      [full_name, birth_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
