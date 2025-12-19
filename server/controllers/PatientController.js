const PatientService = require('../services/PatientService');
const asyncHandler = require('../utils/asyncHandler');

class PatientController {
    static getPatients = asyncHandler(async (req,res) => {
        const patients = await PatientService.getAllPatients();
        res.json(patients);
    });

    static signup = asyncHandler(async (req,res) => {
        const { full_name,email,password,birth_date } = req.body;
        if (!full_name || !email || !password) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        try {
            const result = await PatientService.register({ fullName: full_name,email,password,birthDate: birth_date });
            res.status(201).json(result);
        } catch (err) {
            if (err.message === 'User already exists') {
                res.status(400);
            }
            throw err;
        }
    });

    static login = asyncHandler(async (req,res) => {
        const { email,password } = req.body;
        try {
            const result = await PatientService.login({ email,password });
            res.header('Authorization',result.token).json(result);
        } catch (err) {
            if (err.message === 'Invalid email or password') {
                res.status(400);
            }
            throw err;
        }
    });

    static getMemoryCount = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const result = await PatientService.getMemoryCount(patient_id);
        res.json(result);
    });

    static editProfile = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const { name,email } = req.body;

        try {
            const result = await PatientService.updateProfile(patient_id,{ name,email });
            res.json(result);
        } catch (err) {
            if (err.message === 'Email is already in use') {
                res.status(400);
            }
            if (err.message === 'Patient not found') {
                res.status(404);
            }
            throw err;
        }
    });

    static resetPassword = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const { oldPassword,newPassword } = req.body;

        try {
            const result = await PatientService.resetPassword(patient_id,{ oldPassword,newPassword });
            res.json(result);
        } catch (err) {
            if (err.message === 'Patient not found') {
                res.status(404);
            }
            if (err.message === 'Current password is incorrect') {
                res.status(400);
                throw new Error(err.message);
            }
            throw err;
        }
    });

    static deleteProfile = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        try {
            const result = await PatientService.deleteAccount(patient_id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Patient not found') {
                res.status(404);
            }
            throw err;
        }
    });
}

module.exports = PatientController;
