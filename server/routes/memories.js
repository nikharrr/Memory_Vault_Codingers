const express = require('express');
const router = express.Router();
const MemoryController = require('../controllers/MemoryController');

// Get all memories
router.get('/:patient_id',MemoryController.getMemories);

// Create memory
router.post('/:patient_id/create',MemoryController.createMemory);

// Update memory
router.put('/:patient_id/edit/:memory_id',MemoryController.updateMemory);

// Get favorites
router.get('/:patient_id/favorites',MemoryController.getFavorites);

// Toggle favorite
router.patch('/:patient_id/toggle-favorite/:memory_id',MemoryController.toggleFavorite);

// Get recent memories
router.get('/recent/:patient_id',MemoryController.getRecent);

// Get memory details
router.get('/:patient_id/memory/:memory_id',MemoryController.getMemoryDetail);

module.exports = router;
