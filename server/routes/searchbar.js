const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary');
const db = require('../db');

router.get('/:patient_id/tags',async (req,res) => {
        const { patient_id } = req.params;
        try {
            const result = await db.query('SELECT * FROM tags WHERE patient_id = $1', [patient_id]);
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
});

router.get('/:patient_id/people', async (req, res) => {
    const {patient_id} = req.params;
    try {
        const result = await db.query('SELECT * FROM people WHERE patient_id = $1', [patient_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:patient_id/search',async (req,res) => {
    const { patient_id } = req.params;
    // Accept comma-separated values for multiple tags/people
    const { tags,people } = req.query;
  
    try {
      // Base query
      let query = `
        SELECT DISTINCT m.memory_id, m.title, m.descrip, m.memory_date
        FROM memories m
        WHERE m.patient_id = $1
      `;
      const params = [patient_id];
      let paramIndex = 2;
  
      // Process tags if provided
      if (tags && !people) {
        const tagArray = tags.split(',').map(tag => tag.trim());
        query += `
          AND EXISTS (
            SELECT 1 FROM memorytags mt
            JOIN tags t ON mt.tag_id = t.tag_id
            WHERE mt.memory_id = m.memory_id
            AND t.name = ANY($${paramIndex})
          )
        `;
        params.push(tagArray);
        paramIndex++;
      }
      // Process people if provided
      else if (people && !tags) {
        const peopleArray = people.split(',').map(p => p.trim());
        query += `
          AND EXISTS (
            SELECT 1 FROM memorypeople mp
            JOIN people p ON mp.person_id = p.person_id
            WHERE mp.memory_id = m.memory_id
            AND p.name = ANY($${paramIndex})
          )
        `;
        params.push(peopleArray);
      }
      // Error if both provided
      else if (tags && people) {
        return res.status(400).json({
          error: "Please filter by either tags OR people, not both"
        });
      }
  
      query += ` ORDER BY m.memory_date DESC`;
  
      const result = await db.query(query,params);
      res.json(result.rows);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;