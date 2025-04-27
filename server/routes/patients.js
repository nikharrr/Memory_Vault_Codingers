const express = require('express');
const router = express.Router();
const db = require('../db'); // <-- using db properly

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
router.post('/signup', async (req, res) => {
  const { full_name, email, password , birth_date} = req.body;
  
  if (!full_name || !email || !password) {
    
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    // Check if user already exists
    const existingUser = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new patient
    const newPatient = await db.query(
      'INSERT INTO patients (full_name, email, password , birth_date) VALUES ($1, $2, $3 , $4) RETURNING *',
      [full_name, email, password , birth_date]
    );

    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient.rows[0] });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If you are NOT hashing passwords for now
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Password matches
    res.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
