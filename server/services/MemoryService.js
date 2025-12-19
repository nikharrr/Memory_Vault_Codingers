const db = require('../db');
const cloudinary = require('../cloudinary');
const MemoryModel = require('../models/MemoryModel');
const TagModel = require('../models/TagModel');
const PersonModel = require('../models/PersonModel');

class MemoryService {
    static async getAllMemories(patientId) {
        return await MemoryModel.findAllByPatientId(patientId);
    }

    static async createMemory({ patientId,title,descrip,memoryDate,tags,peopleInvolved,image }) {
        if (!title || !descrip || !memoryDate || !tags || !peopleInvolved || !image) {
            throw new Error('All fields (title, description, memory_date, tags, people_involved, image) are required');
        }

        const client = await db.connect();

        try {
            // Check if patient exists (simple check, skipping for now as strict FK usually handles it, 
            // but original code had it. We'll rely on DB error or add PatientModel if strictly needed later)

            await client.query('BEGIN');

            // 1. Insert Memory
            const memory = await MemoryModel.create(client,{ patientId,title,descrip,memoryDate });
            const memoryId = memory.memory_id;

            // 2. Upload Image
            const cloudinaryImage = await cloudinary.uploader.upload(image,{
                folder: `patients/${patientId}/memories/${memoryId}`,
                public_id: `${patientId}/${memoryId}`,
            });

            // 3. Update Image URL
            await MemoryModel.updateImageUrl(client,memoryId,cloudinaryImage.secure_url);

            // 4. Insert Tags
            for (const tagName of tags) {
                const lowerTag = tagName.toLowerCase();
                let tag = await TagModel.findByNameAndPatientId(client,lowerTag,patientId);

                if (!tag) {
                    tag = await TagModel.create(client,lowerTag,patientId);
                }

                await TagModel.linkToMemory(client,memoryId,tag.tag_id);
            }

            // 5. Insert People
            for (const personName of peopleInvolved) {
                const lowerPersonName = personName.toLowerCase();
                let person = await PersonModel.findByNameAndPatientId(client,lowerPersonName,patientId);

                if (!person) {
                    person = await PersonModel.create(client,lowerPersonName,patientId);
                }

                await PersonModel.linkToMemory(client,memoryId,person.person_id);
            }

            await client.query('COMMIT');

            return { success: true,memory_id: memoryId,image_url: cloudinaryImage.secure_url };

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateMemory({ memoryId,patientId,title,descrip,memoryDate,tags,peopleInvolved }) {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            // Check existence
            const memory = await MemoryModel.findByIdAndPatientId(memoryId,patientId);
            if (!memory) {
                throw new Error('Memory not found');
            }

            // Update basic info
            await MemoryModel.update(client,{ memoryId,patientId,title,descrip,memoryDate });

            // Update Tags
            await TagModel.unlinkAllFromMemory(client,memoryId);
            for (const tagName of tags) {
                const lowerTag = tagName.toLowerCase();
                let tag = await TagModel.findByNameAndPatientId(client,lowerTag,patientId);
                if (!tag) {
                    tag = await TagModel.create(client,lowerTag,patientId);
                }
                await TagModel.linkToMemory(client,memoryId,tag.tag_id);
            }

            // Update People
            await PersonModel.unlinkAllFromMemory(client,memoryId);
            for (const personName of peopleInvolved) {
                const lowerPersonName = personName.toLowerCase();
                let person = await PersonModel.findByNameAndPatientId(client,lowerPersonName,patientId);
                if (!person) {
                    person = await PersonModel.create(client,lowerPersonName,patientId);
                }
                await PersonModel.linkToMemory(client,memoryId,person.person_id);
            }

            await client.query('COMMIT');
            return { message: 'Memory updated successfully' };

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    static async getFavorites(patientId) {
        return await MemoryModel.findFavorites(patientId);
    }

    static async toggleFavorite(memoryId,patientId) {
        return await MemoryModel.toggleFavorite(memoryId,patientId);
    }

    static async getRecentMemories(patientId) {
        return await MemoryModel.findRecent(patientId);
    }

    static async getMemoryDetails(memoryId,patientId) {
        const client = await db.connect(); // Need client for multiple queries or just DB pool is fine
        try {
            const memory = await MemoryModel.findByIdAndPatientId(memoryId,patientId);
            if (!memory) return null;

            const tags = await TagModel.findByMemoryId(client,memoryId);
            const people = await PersonModel.findByMemoryId(client,memoryId);

            return {
                ...memory,
                tags: tags.map(t => t.name),
                people: people.map(p => p.name)
            };
        } finally {
            client.release();
        }
    }
}

module.exports = MemoryService;
