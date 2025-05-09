const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary');
const db = require('../db');

// Get all memories
router.get('/:patient_id',async (req,res) => {
  try {
    const result = await db.query('SELECT * FROM memories ORDER BY memory_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create memory + tags + people
router.post('/:patient_id/create',async (req,res) => {
  const { patient_id } = req.params;
  const { title,descrip,memory_date,tags,people_involved } = req.body;


  const image = req.body.image; // Assuming you're sending the image in the request body


  console.log(patient_id);
  if (!title || !descrip || !memory_date || !tags || !people_involved || !image) {
    return res.status(400).json({ error: 'All fields (title, description, memory_date, tags, people_involved, image) are required' });
  }

  const client = await db.connect(); // Transaction start
  try {
    // Check if patient exists
    const patientCheck = await client.query('SELECT patient_id FROM patients WHERE patient_id = $1',[patient_id]);
    if (patientCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await client.query('BEGIN');

    // Step 1: Insert Memory
    const memoryResult = await client.query(
      `INSERT INTO memories (patient_id, title, descrip, memory_date) 
       VALUES ($1, $2, $3, $4) RETURNING memory_id`,
      [patient_id,title,descrip,memory_date]
    );
    const memoryId = memoryResult.rows[0].memory_id;

    // Step 2: Upload image to Cloudinary
    const cloudinaryImage = await cloudinary.uploader.upload(image,{
      folder: `patients/${patient_id}/memories/${memoryId}`,
      public_id: `${patient_id}/${memoryId}`,
    });

    // Step 3: Update the image_url in the memories table
    await client.query(
      `UPDATE memories SET image_url = $1 WHERE memory_id = $2`,
      [cloudinaryImage.secure_url,memoryId]
    );

    // Step 4: Insert Tags with patient_id
    for (const tagName of tags) {
      const lowerTag = tagName.toLowerCase(); // ✅ convert to lowercase

      let tag = await client.query(
        `SELECT tag_id FROM tags WHERE name = $1 AND patient_id = $2`,
        [lowerTag,patient_id]
      );

      if (tag.rows.length === 0) {
        tag = await client.query(
          `INSERT INTO tags (name, patient_id) VALUES ($1, $2) RETURNING tag_id`,
          [lowerTag,patient_id]
        );
      }

      await client.query(
        `INSERT INTO memorytags (memory_id, tag_id) VALUES ($1, $2)`,
        [memoryId,tag.rows[0].tag_id]
      );
    }


    // Step 5: Insert People with patient_id
    for (const personName of people_involved) {
      const lowercasePersonName = personName.toLowerCase(); // Convert for the SELECT query
      let person = await client.query(`SELECT person_id FROM people WHERE name = $1 AND patient_id = $2`,[lowercasePersonName,patient_id]);
      if (person.rows.length === 0) {
        person = await client.query(
          `INSERT INTO people (name, patient_id) VALUES ($1, $2) RETURNING person_id`,
          [lowercasePersonName,patient_id] // Already lowercase here
        );
      }
      await client.query(`INSERT INTO memorypeople (memory_id, person_id) VALUES ($1, $2)`,[memoryId,person.rows[0].person_id]);
    }

    await client.query('COMMIT');

    res.status(201).json({ success: true,memory_id: memoryId,image_url: cloudinaryImage.secure_url });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Update memory
router.put('/:patient_id/edit/:memory_id',async (req,res) => {
  const { patient_id,memory_id } = req.params;
  const { title,descrip,memory_date,tags,people_involved } = req.body;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Check if patient and memory exist
    const memoryCheck = await client.query(
      'SELECT * FROM memories WHERE memory_id = $1 AND patient_id = $2',
      [memory_id,patient_id]
    );
    if (memoryCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Memory not found' });
    }

    // Update memory details
    await client.query(
      `UPDATE memories 
       SET title = $1, descrip = $2, memory_date = $3
       WHERE memory_id = $4 AND patient_id = $5`,
      [title,descrip,memory_date,memory_id,patient_id]
    );

    // Delete only the tag associations for this specific memory
    await client.query('DELETE FROM memorytags WHERE memory_id = $1',[memory_id]);

    // Add new tag associations
    for (const tagName of tags) {
      const lowerTag = tagName.toLowerCase();
      let tag = await client.query(
        'SELECT tag_id FROM tags WHERE name = $1 AND patient_id = $2',
        [lowerTag,patient_id]
      );

      if (tag.rows.length === 0) {
        tag = await client.query(
          'INSERT INTO tags (name, patient_id) VALUES ($1, $2) RETURNING tag_id',
          [lowerTag,patient_id]
        );
      }

      await client.query(
        'INSERT INTO memorytags (memory_id, tag_id) VALUES ($1, $2)',
        [memory_id,tag.rows[0].tag_id]
      );
    }

    // Delete only the people associations for this specific memory
    await client.query('DELETE FROM memorypeople WHERE memory_id = $1',[memory_id]);

    // Add new people associations
    for (const personName of people_involved) {
      const lowerPersonName = personName.toLowerCase();
      let person = await client.query(
        'SELECT person_id FROM people WHERE name = $1 AND patient_id = $2',
        [lowerPersonName,patient_id]
      );

      if (person.rows.length === 0) {
        person = await client.query(
          'INSERT INTO people (name, patient_id) VALUES ($1, $2) RETURNING person_id',
          [lowerPersonName,patient_id]
        );
      }

      await client.query(
        'INSERT INTO memorypeople (memory_id, person_id) VALUES ($1, $2)',
        [memory_id,person.rows[0].person_id]
      );
    }

    await client.query('COMMIT');
    res.json({ message: 'Memory updated successfully' });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating memory:',err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

router.get('/:patient_id/favorites',async (req,res) => {
  const { patient_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM memories WHERE patient_id = $1 AND favorite = true ORDER BY memory_date DESC',[patient_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:patient_id/toggle-favorite/:memory_id',async (req,res) => {
  const { patient_id,memory_id } = req.params;
  try {
    const result = await db.query('UPDATE memories SET favorite = NOT favorite WHERE memory_id = $1 AND patient_id = $2 RETURNING *',[memory_id,patient_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent memories (up to 1 week old, max 6 memories)
router.get('/recent/:patient_id',async (req,res) => {
  try {
    const { patient_id } = req.params;

    const result = await db.query(
      `SELECT m.*, 
              to_char(m.memory_date, 'YYYY-MM-DD') as formatted_date,
              to_char(m.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_time
       FROM memories m
       WHERE m.patient_id = $1 
       AND m.created_at >= NOW() - INTERVAL '1 week'
       ORDER BY m.created_at DESC 
       LIMIT 6`,
      [patient_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get detailed memory information including tags and people
router.get('/:patient_id/memory/:memory_id',async (req,res) => {
  const { patient_id,memory_id } = req.params;
  const client = await db.connect();

  try {
    // Get memory details
    const memoryResult = await client.query(
      `SELECT m.* 
       FROM memories m 
       WHERE m.memory_id = $1 AND m.patient_id = $2`,
      [memory_id,patient_id]
    );

    if (memoryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Memory not found' });
    }

    const memory = memoryResult.rows[0];

    // Get tags for the memory
    const tagsResult = await client.query(
      `SELECT t.name 
       FROM memorytags mt
       JOIN tags t ON mt.tag_id = t.tag_id
       WHERE mt.memory_id = $1`,
      [memory_id]
    );

    // Get people involved in the memory
    const peopleResult = await client.query(
      `SELECT p.name 
       FROM memorypeople mp
       JOIN people p ON mp.person_id = p.person_id
       WHERE mp.memory_id = $1`,
      [memory_id]
    );

    // Combine all the data
    const memoryWithDetails = {
      ...memory,
      tags: tagsResult.rows.map(tag => tag.name),
      people: peopleResult.rows.map(person => person.name)
    };

    res.json(memoryWithDetails);
  } catch (err) {
    console.error('Error fetching memory details:',err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
