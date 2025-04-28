const express = require('express');
const router = express.Router();
const db = require('../db'); // <-- using db properly

// routes/profile.js
router.get('/:patient_id/memory-count', async (req, res) => {
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
      console.error('Error fetching memory count:', err);
      res.status(500).json({ 
        error: 'Failed to get memory count',
        details: err.message  // Include specific error
      });
    }
  });

//Add logic for Edit profile route /:patient_id/edit-profile 
//Add logic for reset  password /:patient_id/reset-password **first check that old password is matched then only let them reset **
//Add logic for delete profile  /:patient_id/delete-profile


module.exports = router;
