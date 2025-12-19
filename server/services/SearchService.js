const TagModel = require('../models/TagModel');
const PersonModel = require('../models/PersonModel');
const MemoryModel = require('../models/MemoryModel');
const db = require('../db');

class SearchService {
    static async getTags(patientId) {
        const client = await db.connect();
        try {
            return await TagModel.findAllNamesByPatientId(client,patientId);
        } finally {
            client.release();
        }
    }

    static async getPeople(patientId) {
        const client = await db.connect();
        try {
            return await PersonModel.findAllNamesByPatientId(client,patientId);
        } finally {
            client.release();
        }
    }

    static async searchMemories(patientId,tags,people) {
        // 1. Get base memories filtering by Patient + Tags + People
        const memories = await MemoryModel.search(patientId,tags,people);

        // 2. Hydrate with full details (Tags + People names for each memory)
        const client = await db.connect();
        try {
            const memoriesWithDetails = await Promise.all(
                memories.map(async (memory) => {
                    const [memoryTags,memoryPeople] = await Promise.all([
                        TagModel.findByMemoryId(client,memory.memory_id),
                        PersonModel.findByMemoryId(client,memory.memory_id)
                    ]);

                    return {
                        ...memory,
                        tags: memoryTags.map(t => t.name),
                        people: memoryPeople.map(p => p.name)
                    };
                })
            );

            return memoriesWithDetails;
        } finally {
            client.release();
        }
    }
}

module.exports = SearchService;
