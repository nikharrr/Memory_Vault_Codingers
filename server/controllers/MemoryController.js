const MemoryService = require('../services/MemoryService');
const asyncHandler = require('../utils/asyncHandler');

class MemoryController {
    static getMemories = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const memories = await MemoryService.getAllMemories(patient_id);
        res.json(memories);
    });

    static createMemory = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const { title,descrip,memory_date,tags,people_involved,image } = req.body;

        try {
            const result = await MemoryService.createMemory({
                patientId: patient_id,
                title,
                descrip,
                memoryDate: memory_date,
                tags,
                peopleInvolved: people_involved,
                image
            });

            res.status(201).json(result);
        } catch (err) {
            if (err.message === 'Patient not found') {
                res.status(404);
                throw new Error(err.message);
            }
            if (err.message.includes('required')) {
                res.status(400);
                throw new Error(err.message);
            }
            throw err;
        }
    });

    static updateMemory = asyncHandler(async (req,res) => {
        const { patient_id,memory_id } = req.params;
        const { title,descrip,memory_date,tags,people_involved } = req.body;

        try {
            const result = await MemoryService.updateMemory({
                memoryId: memory_id,
                patientId: patient_id,
                title,
                descrip,
                memoryDate: memory_date,
                tags,
                peopleInvolved: people_involved
            });

            res.json(result);
        } catch (err) {
            if (err.message === 'Memory not found') {
                res.status(404);
                throw new Error(err.message);
            }
            throw err;
        }
    });

    static getFavorites = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const favorites = await MemoryService.getFavorites(patient_id);
        res.json(favorites);
    });

    static toggleFavorite = asyncHandler(async (req,res) => {
        const { patient_id,memory_id } = req.params;
        const result = await MemoryService.toggleFavorite(memory_id,patient_id);
        res.json(result);
    });

    static getRecent = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const recent = await MemoryService.getRecentMemories(patient_id);
        res.json(recent);
    });

    static getMemoryDetail = asyncHandler(async (req,res) => {
        const { patient_id,memory_id } = req.params;
        const memory = await MemoryService.getMemoryDetails(memory_id,patient_id);

        if (!memory) {
            res.status(404);
            throw new Error('Memory not found');
        }

        res.json(memory);
    });
}

module.exports = MemoryController;
