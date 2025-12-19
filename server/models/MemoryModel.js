const db = require('../db');

class MemoryModel {
    static async findAllByPatientId(patientId) {
        const query = 'SELECT * FROM memories WHERE patient_id = $1 ORDER BY memory_date DESC';
        const result = await db.query(query,[patientId]);
        return result.rows;
    }

    static async findByIdAndPatientId(memoryId,patientId) {
        const query = 'SELECT * FROM memories WHERE memory_id = $1 AND patient_id = $2';
        const result = await db.query(query,[memoryId,patientId]);
        return result.rows[0];
    }

    static async create(client,{ patientId,title,descrip,memoryDate }) {
        const query = `
      INSERT INTO memories (patient_id, title, descrip, memory_date) 
      VALUES ($1, $2, $3, $4) RETURNING memory_id
    `;
        const result = await client.query(query,[patientId,title,descrip,memoryDate]);
        return result.rows[0];
    }

    static async updateImageUrl(client,memoryId,imageUrl) {
        const query = 'UPDATE memories SET image_url = $1 WHERE memory_id = $2';
        await client.query(query,[imageUrl,memoryId]);
    }

    static async update(client,{ memoryId,patientId,title,descrip,memoryDate }) {
        const query = `
      UPDATE memories 
      SET title = $1, descrip = $2, memory_date = $3
      WHERE memory_id = $4 AND patient_id = $5
    `;
        await client.query(query,[title,descrip,memoryDate,memoryId,patientId]);
    }

    static async findFavorites(patientId) {
        const query = 'SELECT * FROM memories WHERE patient_id = $1 AND favorite = true ORDER BY memory_date DESC';
        const result = await db.query(query,[patientId]);
        return result.rows;
    }

    static async toggleFavorite(memoryId,patientId) {
        const query = 'UPDATE memories SET favorite = NOT favorite WHERE memory_id = $1 AND patient_id = $2 RETURNING *';
        const result = await db.query(query,[memoryId,patientId]);
        return result.rows[0];
    }

    static async findRecent(patientId) {
        const query = `
      SELECT m.*, 
             to_char(m.memory_date, 'YYYY-MM-DD') as formatted_date,
             to_char(m.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_time
      FROM memories m
      WHERE m.patient_id = $1 
      AND m.created_at >= NOW() - INTERVAL '1 week'
      ORDER BY m.created_at DESC 
      LIMIT 6
    `;
        const result = await db.query(query,[patientId]);
        return result.rows;
    }

    static async search(patientId,tags,people) {
        let query = `
          SELECT DISTINCT m.memory_id, m.title, m.descrip, m.memory_date, m.image_url, m.favorite
          FROM memories m
          WHERE m.patient_id = $1
        `;
        const params = [patientId];
        let paramIndex = 2;

        if (tags && tags.length > 0) {
            query += `
            AND EXISTS (
              SELECT 1 FROM memorytags mt
              JOIN tags t ON mt.tag_id = t.tag_id
              WHERE mt.memory_id = m.memory_id
              AND t.name = ANY($${paramIndex})
            )
          `;
            params.push(tags);
            paramIndex++;
        }

        if (people && people.length > 0) {
            query += `
            AND EXISTS (
              SELECT 1 FROM memorypeople mp
              JOIN people p ON mp.person_id = p.person_id
              WHERE mp.memory_id = m.memory_id
              AND p.name = ANY($${paramIndex})
            )
          `;
            params.push(people);
        }

        query += ` ORDER BY m.memory_date DESC`;
        const result = await db.query(query,params);
        return result.rows;
    }

    static async deleteAllByPatientId(client,patientId) {
        const query = 'DELETE FROM memories WHERE patient_id = $1';
        await client.query(query,[patientId]);
    }

    static async countByPatientId(patientId) {
        const query = 'SELECT COUNT(*) as total_memories FROM memories WHERE patient_id = $1';
        const result = await db.query(query,[patientId]);
        return parseInt(result.rows[0].total_memories,10);
    }
}

module.exports = MemoryModel;
