const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');

// Get all people for a patient
router.get('/:patient_id/people',PersonController.getPeople);

// Create a new person
router.post('/:patient_id/people/create',PersonController.createPerson);

// Delete a person
router.delete('/:patient_id/people/delete/:person_id',PersonController.deletePerson);

// Toggle favorite status
router.patch('/:patient_id/people/toggle-fav/:person_id',PersonController.toggleFavorite);

// Edit person details
router.put('/:patient_id/people/edit/:person_id',PersonController.editPerson);

module.exports = router;