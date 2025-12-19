class TagModel {
    static async findByNameAndPatientId(client,name,patientId) {
        const query = 'SELECT tag_id FROM tags WHERE name = $1 AND patient_id = $2';
        const result = await client.query(query,[name,patientId]);
        return result.rows[0];
    }

    static async create(client,name,patientId) {
        const query = 'INSERT INTO tags (name, patient_id) VALUES ($1, $2) RETURNING tag_id';
        const result = await client.query(query,[name,patientId]);
        return result.rows[0];
    }

    static async findAllNamesByPatientId(client,patientId) {
        const query = 'SELECT name FROM tags WHERE patient_id = $1';
        const result = await client.query(query,[patientId]);
        return result.rows.map(row => row.name);
    }

    static async linkToMemory(client,memoryId,tagId) {
        const query = 'INSERT INTO memorytags (memory_id, tag_id) VALUES ($1, $2)';
        await client.query(query,[memoryId,tagId]);
    }

    static async unlinkAllFromMemory(client,memoryId) {
        const query = 'DELETE FROM memorytags WHERE memory_id = $1';
        await client.query(query,[memoryId]);
    }

    static async findByMemoryId(client,memoryId) {
        const query = `
      SELECT t.name 
      FROM memorytags mt
      JOIN tags t ON mt.tag_id = t.tag_id
      WHERE mt.memory_id = $1
    `;
        const result = await client.query(query,[memoryId]);
        return result.rows;
    }
}

module.exports = TagModel;
