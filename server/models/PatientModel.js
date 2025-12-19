const db = require('../db');

class PatientModel {
    static async findAll() {
        const query = 'SELECT * FROM patients ORDER BY full_name';
        const result = await db.query(query);
        return result.rows;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM patients WHERE email = $1';
        const result = await db.query(query,[email]);
        return result.rows[0];
    }

    static async findById(patientId) {
        const query = 'SELECT * FROM patients WHERE patient_id = $1';
        const result = await db.query(query,[patientId]);
        return result.rows[0];
    }

    static async emailExistsOtherThan(email,patientId) {
        const query = 'SELECT 1 FROM patients WHERE email = $1 AND patient_id != $2';
        const result = await db.query(query,[email,patientId]);
        return result.rows.length > 0;
    }

    static async create({ fullName,email,password,birthDate }) {
        const query = 'INSERT INTO patients (full_name, email, password, birth_date) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query,[fullName,email,password,birthDate]);
        return result.rows[0];
    }

    static async update(client,{ patientId,fullName,email }) {
        const query = 'UPDATE patients SET full_name = $1, email = $2 WHERE patient_id = $3 RETURNING *';
        const result = await client.query(query,[fullName,email,patientId]);
        return result.rows[0];
    }

    static async updatePassword(client,{ patientId,password }) {
        const query = 'UPDATE patients SET password = $1 WHERE patient_id = $2';
        await client.query(query,[password,patientId]);
    }

    static async delete(client,patientId) {
        const query = 'DELETE FROM patients WHERE patient_id = $1 RETURNING *';
        const result = await client.query(query,[patientId]);
        return result.rows[0];
    }
}

module.exports = PatientModel;
