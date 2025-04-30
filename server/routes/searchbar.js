const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary');
const db = require('../db');


router.get('/:patient_id/tagsName', async (req, res) => {
    const { patient_id } = req.params;
    try {
        const result = await db.query('SELECT name FROM tags WHERE patient_id = $1', [patient_id]);
        res.json(result.rows.map(row => row.name));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});



router.get('/:patient_id/peopleName', async (req, res) => {
    
    const { patient_id } = req.params;
    try {
        const result = await db.query('SELECT name FROM people WHERE patient_id = $1', [patient_id]);
        res.json(result.rows.map(row => row.name));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.get('/:patient_id/search', async (req, res) => {
    const { patient_id } = req.params;
    const { tags, people } = req.query;
  
    try {
      let query = `
        SELECT DISTINCT m.memory_id, m.title, m.descrip, m.memory_date, m.image_url, m.favorite
        FROM memories m
        WHERE m.patient_id = $1
      `;
      const params = [patient_id];
      let paramIndex = 2;
  
      // Process tags if provided
      if (tags) {
        const tagArray = tags.split(',');
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
      if (people) {
        const peopleArray = people.split(',');
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
  
      query += ` ORDER BY m.memory_date DESC`;
  
      const result = await db.query(query, params);
      
      // Get tags and people for each memory
      const memoriesWithDetails = await Promise.all(
        result.rows.map(async (memory) => {
          const [tagsRes, peopleRes] = await Promise.all([
            db.query(`
              SELECT t.name FROM memorytags mt
              JOIN tags t ON mt.tag_id = t.tag_id
              WHERE mt.memory_id = $1
            `, [memory.memory_id]),
            
            db.query(`
              SELECT p.name FROM memorypeople mp
              JOIN people p ON mp.person_id = p.person_id
              WHERE mp.memory_id = $1
            `, [memory.memory_id])
          ]);
  
          return {
            ...memory,
            tags: tagsRes.rows.map(row => row.name),
            people: peopleRes.rows.map(row => row.name)
          };
        })
      );
  
      res.json(memoriesWithDetails);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: err.message });
    }
  });
  module.exports = router;