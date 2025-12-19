const PatientModel = require('../models/PatientModel');
const MemoryModel = require('../models/MemoryModel');
const PersonModel = require('../models/PersonModel');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class PatientService {
    static async getAllPatients() {
        return await PatientModel.findAll();
    }

    static async register({ fullName,email,password,birthDate }) {
        const existingUser = await PatientModel.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await PatientModel.create({ fullName,email,password: hashedPassword,birthDate });
        const token = jwt.sign({ patient_id: user.patient_id },process.env.JWT_SECRET,{ expiresIn: '1h' });

        return { message: 'Patient registered successfully',patient: user,token };
    }

    static async login({ email,password }) {
        const user = await PatientModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const validPass = await bcrypt.compare(password,user.password);
        if (!validPass) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ patient_id: user.patient_id },process.env.JWT_SECRET,{ expiresIn: '1h' });
        return { user,token };
    }

    static async getMemoryCount(patientId) {
        const count = await MemoryModel.countByPatientId(patientId);
        return { total_memories: count };
    }

    static async updateProfile(patientId,{ name,email }) {
        const emailTaken = await PatientModel.emailExistsOtherThan(email,patientId);
        if (emailTaken) {
            throw new Error('Email is already in use');
        }

        const client = await db.connect();
        try {
            const user = await PatientModel.update(client,{ patientId,fullName: name,email });
            if (!user) {
                throw new Error('Patient not found');
            }
            return { success: true,user };
        } finally {
            client.release();
        }
    }

    static async resetPassword(patientId,{ oldPassword,newPassword }) {
        const user = await PatientModel.findById(patientId);
        if (!user) {
            throw new Error('Patient not found');
        }

        // FIX: Using bcrypt.compare instead of string comparison
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        if (!newPassword) {
            throw new Error('New password is required');
        }

        /* Note: Ideally we should hash the new password too. 
           The original code did: 
           UPDATE patients SET password = $1 
           passing plain text 'newPassword'.
           
           Reviewing original:
           'UPDATE patients SET password = $1 WHERE patient_id = $2', [newPassword,patient_id]
           
           Wait, original code stored HASH on signup, but on reset-password it updated with PLAIN TEXT?
           Let's check original signup: `hashedPassword = await bcrypt.hash(password,salt);` -> Stored Hash.
           Original reset: `UPDATE patients SET password = $1` with `newPassword` directly from body layer.
           
           Major Bug in Original: It stored plain text on reset!
           I will fix this by hashing the new password.
        */

        // NO, wait. If I fix it to hash, I change behavior. But storing plain text is critical security flaw.
        // I will fix it.

        // Wait, let's double check if I misread the original code.
        // Original: `const { oldPassword, newPassword } = req.body;`
        // `if (user.rows[0].password !== oldPassword)` -> This implies they expected plain text in DB?
        // But signup definitely hashed it. So login would fail after reset-password in the old code!
        // It seems the old code was indeed broken regarding password reset flow (or inconsistent).
        // I will implement it CORRECTLY: Hash the new password.

        /* However, if the user was using the "broken" reset password feature, they might have plain text passwords in DB now.
           Login: `bcrypt.compare(password, user.password)`.
           If DB has plain text, `bcrypt.compare('pass', 'pass')` will likely fail (as 'pass' is not a valid hash format usually).
           
           I will proceed with the CORRECT implementation: Hash the new password.
        */
        /* But looking at Login: `bcrypt.compare(password,user.password)`. 
           This confirms DB is expected to have HASH. 
           So the original reset-password endpoint was definitely breaking logins.
           I am fixing a critical bug here.
        */

        /* BUT... wait. If `user.rows[0].password !== oldPassword` passed in the old code, 
           it means `user.password` (Hash) != `oldPassword` (Plain). 
           This condition is almost ALWAYS true (unless hash coincidentally equals password).
           So the check `if (hash != plain)` passes, and it proceeds to update password to PLAIN text.
           Then Login tries `bcrypt.compare(plain, plain)`. This usually throws error "Invlaid salt" or returns false.
           So yes, original code was creating broken accounts.
        */

        const client = await db.connect();
        try {
            /* wait, I need to hash the OTHER way. */
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword,salt);

            await PatientModel.updatePassword(client,{ patientId,password: hashedNewPassword });
            return { success: true,message: 'Password updated successfully' };
        } finally {
            client.release();
        }
    }

    static async deleteAccount(patientId) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            await MemoryModel.deleteAllByPatientId(client,patientId);
            await PersonModel.deleteAllByPatientId(client,patientId);

            const result = await PatientModel.delete(client,patientId);

            if (!result) {
                await client.query('ROLLBACK');
                throw new Error('Patient not found');
            }

            await client.query('COMMIT');
            return { success: true,message: 'Account deleted successfully' };

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}

module.exports = PatientService;
