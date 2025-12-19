const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Get total memories count
router.get('/:patient_id/memory-count',PatientController.getMemoryCount);

// Edit profile
router.put('/:patient_id/edit-profile',PatientController.editProfile);

// Reset password
router.post('/:patient_id/reset-password',PatientController.resetPassword);

// Delete profile
router.delete('/:patient_id/delete-profile',PatientController.deleteProfile);

module.exports = router;
