const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');

// Get all tag names for a patient (used for autocomplete/filter options)
router.get('/:patient_id/tagsName',SearchController.getTags);

// Get all people names for a patient
router.get('/:patient_id/peopleName',SearchController.getPeople);

// Search memories by tags and people
router.get('/:patient_id/search',SearchController.search);

module.exports = router;
