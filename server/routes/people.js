const express = require('express');
const router = express.Router();
const db = require('../db');
const { config } = require('dotenv');

router.get('/:patient_id/people', async (req, res) => {
    const {patient_id} = req.params;
    try {
        const result = await db.query('SELECT * FROM people WHERE patient_id = $1', [patient_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:patient_id/people/create', async (req, res) => {
    const { patient_id } = req.params;
    const { name, relationship, image_url } = req.body;
    
    try {
        // 1. Verify required fields
        if (!name || !relationship) {
            return res.status(400).json({ error: "Name and relationship are required" });
        }

        // 2. Check if patient exists
        const patientExists = await db.query(
            'SELECT 1 FROM patients WHERE patient_id = $1', 
            [patient_id]
        );
        if (patientExists.rows.length === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // 3. Insert new person
        const insertResult = await db.query(
            'INSERT INTO people (name, patient_id, relationship) VALUES ($1, $2, $3) RETURNING person_id, name, patient_id, relationship',
            [name, patient_id, relationship]
        );
        
        const newPerson = insertResult.rows[0];
        const personId = newPerson.person_id;

        // 4. Handle image upload if provided
        
        if (image_url) {
            try {
                const cloudinaryImage = await cloudinary.uploader.upload(image_url, {
                    folder: `patients/${patient_id}/people/${personId}`,
                    public_id: `${patient_id}_${personId}_${Date.now()}`,
                    overwrite: false
                });
                
                
                // Update with image URL
                const updateResult = await db.query(
                    'UPDATE people SET image_url = $1 WHERE person_id = $2 RETURNING *',
                    [cloudinaryImage.secure_url, personId]
                );
                
                return res.status(201).json(updateResult.rows[0]);
            } catch (uploadError) {
                // If image upload fails, delete the created record
                await db.query('DELETE FROM people WHERE person_id = $1', [personId]);
                return res.status(500).json({ 
                    error: "Image upload failed",
                    details: uploadError.message 
                });
            }
        }

        // 5. Return success response
        res.status(201).json(newPerson);

    } catch (err) {
        res.status(500).json({ 
            error: "Server error",
            details: err.message 
        });
    }
});

router.delete('/:patient_id/people/delete/:person_id', async (req, res) => {
    const { patient_id, person_id } = req.params;

    try {
        const result = await db.query('DELETE FROM people WHERE person_id = $1 AND patient_id = $2 RETURNING *', [person_id, patient_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.patch('/:patient_id/people/edit/:person_id', async (req, res) => {
    const { patient_id, person_id } = req.params;
    const { favorite } = req.body;
    try {
       
        // Update favorite status
        const result = await db.query(
            `UPDATE people 
             SET favorite = $1
             WHERE person_id = $2 AND patient_id = $3
             RETURNING *`,
            [favorite, person_id, patient_id]
        );

        // 3. Return the updated record
        res.json({
            success: true,
            person: result.rows[0]
        });
        
    } catch (err) {
        console.error('Error toggling favorite:', err);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            details: err.message 
        });
    }
});
module.exports = router;