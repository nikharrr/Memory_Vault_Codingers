const PersonService = require('../services/PersonService');
const asyncHandler = require('../utils/asyncHandler');

class PersonController {
    static getPeople = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const people = await PersonService.getPeople(patient_id);
        res.json(people);
    });

    static createPerson = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const { name,relationship,image_url } = req.body;

        // Note: Patient exists check is implicitly handled by foreign key constraints usually,
        // or by custom logic in Service if strictly required before insert.
        // The original code had a specific check.

        try {
            const result = await PersonService.createPerson(patient_id,{ name,relationship,image_url });
            res.status(201).json(result);
        } catch (err) {
            if (err.message.includes('required')) {
                res.status(400);
                throw new Error(err.message);
            }
            throw err;
        }
    });

    static deletePerson = asyncHandler(async (req,res) => {
        const { patient_id,person_id } = req.params;
        const result = await PersonService.deletePerson(patient_id,person_id);
        res.json(result);
    });

    static toggleFavorite = asyncHandler(async (req,res) => {
        const { patient_id,person_id } = req.params;
        const { favorite } = req.body;
        const result = await PersonService.toggleFavorite(patient_id,person_id,favorite);
        res.json(result);
    });

    static editPerson = asyncHandler(async (req,res) => {
        const { patient_id,person_id } = req.params;
        const { name,relationship,image_url } = req.body;

        try {
            const result = await PersonService.updatePerson(patient_id,person_id,{ name,relationship,image_url });
            res.json(result);
        } catch (err) {
            if (err.message.includes('required')) {
                res.status(400);
                throw new Error(err.message);
            }
            if (err.message === 'Person not found') {
                res.status(404);
                throw new Error(err.message);
            }
            throw err;
        }
    });
}

module.exports = PersonController;
