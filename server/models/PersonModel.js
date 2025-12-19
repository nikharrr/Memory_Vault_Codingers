const db = require('../db');

class PersonModel {
    static async findByNameAndPatientId(client,name,patientId) {
        const query = 'SELECT person_id FROM people WHERE name = $1 AND patient_id = $2';
        const result = await client.query(query,[name,patientId]);
        return result.rows[0];
    }

    static async create(client,{ name,patientId,relationship }) {
        const query = 'INSERT INTO people (name, patient_id, relationship) VALUES ($1, $2, $3) RETURNING *';
        const result = await client.query(query,[name,patientId,relationship]);
        return result.rows[0];
    }

    static async linkToMemory(client,memoryId,personId) {
        const query = 'INSERT INTO memorypeople (memory_id, person_id) VALUES ($1, $2)';
        await client.query(query,[memoryId,personId]);
    }

    static async unlinkAllFromMemory(client,memoryId) {
        const query = 'DELETE FROM memorypeople WHERE memory_id = $1';
        await client.query(query,[memoryId]);
    }

    static async findByMemoryId(client,memoryId) {
        const query = `
      SELECT p.name 
      FROM memorypeople mp
      JOIN people p ON mp.person_id = p.person_id
      WHERE mp.memory_id = $1
    `;
        const result = await client.query(query,[memoryId]);
        return result.rows;
    }

    static async findAllNamesByPatientId(client,patientId) {
        const query = 'SELECT name FROM people WHERE patient_id = $1';
        const result = await client.query(query,[patientId]);
        return result.rows.map(row => row.name);
    }

    static async findAllByPatientId(client,patientId) {
        const query = 'SELECT * FROM people WHERE patient_id = $1';
        const result = await client.query(query,[patientId]);
        return result.rows;
    }

    static async findByIdAndPatientId(client,personId,patientId) {
        const query = 'SELECT * FROM people WHERE person_id = $1 AND patient_id = $2';
        const result = await client.query(query,[personId,patientId]);
        return result.rows[0];
    }

    static async updateImageUrl(client,personId,imageUrl) {
        const query = 'UPDATE people SET image_url = $1 WHERE person_id = $2 RETURNING *';
        const result = await client.query(query,[imageUrl,personId]);
        return result.rows[0];
    }

    static async update(client,{ personId,patientId,name,relationship }) {
        const query = 'UPDATE people SET name = $1, relationship = $2 WHERE person_id = $3 AND patient_id = $4 RETURNING *';
        const result = await client.query(query,[name,relationship,personId,patientId]);
        return result.rows[0];
    }

    static async delete(client,personId,patientId) {
        const query = 'DELETE FROM people WHERE person_id = $1 AND patient_id = $2 RETURNING *';
        const result = await client.query(query,[personId,patientId]);
        return result.rows[0];
    }

    static async toggleFavorite(client,personId,patientId,isFavorite) {
        const query = 'UPDATE people SET favorite = $1 WHERE person_id = $2 AND patient_id = $3 RETURNING *';
        const result = await client.query(query,[isFavorite,personId,patientId]);
        return result.rows[0];
    }

    static async deleteAllByPatientId(client,patientId) {
        const query = 'DELETE FROM people WHERE patient_id = $1';
        await client.query(query,[patientId]);
    }
}

module.exports = PersonModel;
