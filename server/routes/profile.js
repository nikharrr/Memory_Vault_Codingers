const express = require('express');
const router = express.Router();
const db = require('../db'); // <-- using db properly

// routes/profile.js
router.get('/:patient_id/memory-count',async (req,res) => {
  try {
    const { patient_id } = req.params;

    const result = await db.query(
      `SELECT COUNT(*) as total_memories 
         FROM memories 
         WHERE patient_id = $1`,
      [patient_id]  // Using patient_id directly
    );

    res.json({
      total_memories: Number(result.rows[0].total_memories)
    });

  } catch (err) {
    console.error('Error fetching memory count:',err);
    res.status(500).json({
      error: 'Failed to get memory count',
      details: err.message  // Include specific error
    });
  }
});

// Edit profile
router.put('/:patient_id/edit-profile',async (req,res) => {
  try {
    const { patient_id } = req.params;
    const { name,email } = req.body;

    // Check if email is already taken by another user
    const emailCheck = await db.query(
      'SELECT * FROM patients WHERE email = $1 AND patient_id != $2',
      [email,patient_id]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Update profile
    const result = await db.query(
      'UPDATE patients SET full_name = $1, email = $2 WHERE patient_id = $3 RETURNING *',
      [name,email,patient_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Error updating profile:',err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset password
router.post('/:patient_id/reset-password',async (req,res) => {
  try {
    const { patient_id } = req.params;
    const { oldPassword,newPassword } = req.body;

    // Verify old password
    const user = await db.query(
      'SELECT * FROM patients WHERE patient_id = $1',
      [patient_id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (user.rows[0].password !== oldPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    await db.query(
      'UPDATE patients SET password = $1 WHERE patient_id = $2',
      [newPassword,patient_id]
    );

    res.json({ success: true,message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error resetting password:',err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete profile
router.delete('/:patient_id/delete-profile',async (req,res) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const { patient_id } = req.params;

    // Delete all associated memories and people
    await client.query('DELETE FROM memories WHERE patient_id = $1',[patient_id]);
    await client.query('DELETE FROM people WHERE patient_id = $1',[patient_id]);

    // Delete the patient
    const result = await client.query(
      'DELETE FROM patients WHERE patient_id = $1 RETURNING *',
      [patient_id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Patient not found' });
    }

    await client.query('COMMIT');
    res.json({ success: true,message: 'Account deleted successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error deleting profile:',err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
