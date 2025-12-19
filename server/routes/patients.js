const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

// Get all patients
router.get('/',PatientController.getPatients);

// Create a patient
router.post('/signup',PatientController.signup);

// Login
router.post('/login',PatientController.login);

module.exports = router;
