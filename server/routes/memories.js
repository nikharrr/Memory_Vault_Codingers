const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all memories
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM memories ORDER BY memory_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a memory
// Create memory + tags + people
router.post('/:patient_id/create', async (req, res) => {
  const { patient_id } = req.params;
  const { title, descrip, memory_date, tags, people_involved } = req.body;
  console.log(patient_id);
  if (!title || !descrip || !memory_date || !tags || !people_involved) {
    return res.status(400).json({ error: 'All fields (title, description, memory_date, tags, people_involved) are required' });
  }

  const client = await db.connect(); // Transaction start
  try {
    // Check if patient exists
    const patientCheck = await client.query('SELECT patient_id FROM patients WHERE patient_id = $1', [patient_id]);
    if (patientCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await client.query('BEGIN');

    // Step 1: Insert Memory
    const memoryResult = await client.query(
      `INSERT INTO memories (patient_id, title, descrip, memory_date) 
       VALUES ($1, $2, $3, $4) RETURNING memory_id`,
      [patient_id, title, descrip, memory_date]
    );
    const memoryId = memoryResult.rows[0].memory_id;

    // Step 2: Insert Tags with patient_id
    for (const tagName of tags) {
      let tag = await client.query(`SELECT tag_id FROM tags WHERE name = $1 AND patient_id = $2`, [tagName, patient_id]);
      if (tag.rows.length === 0) {
        tag = await client.query(
          `INSERT INTO tags (name, patient_id) VALUES ($1, $2) RETURNING tag_id`, 
          [tagName, patient_id]
        );
      }
      await client.query(`INSERT INTO memorytags (memory_id, tag_id) VALUES ($1, $2)`, [memoryId, tag.rows[0].tag_id]);
    }

    // Step 3: Insert People with patient_id
    for (const personName of people_involved) {
      let person = await client.query(`SELECT person_id FROM people WHERE name = $1 AND patient_id = $2`, [personName, patient_id]);
      if (person.rows.length === 0) {
        person = await client.query(
          `INSERT INTO people (name, patient_id) VALUES ($1, $2) RETURNING person_id`, 
          [personName, patient_id]
        );
      }
      await client.query(`INSERT INTO memorypeople (memory_id, person_id) VALUES ($1, $2)`, [memoryId, person.rows[0].person_id]);
    }

    await client.query('COMMIT');

    res.status(201).json({ success: true, memory_id: memoryId });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

router.get('/:patient_id/search', async (req, res) => {
  const { patient_id } = req.params;
  // Accept comma-separated values for multiple tags/people
  const { tags, people } = req.query;

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

    const result = await db.query(query, params);
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
