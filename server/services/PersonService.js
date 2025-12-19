const PersonModel = require('../models/PersonModel');
const db = require('../db');
const cloudinary = require('../cloudinary');

class PersonService {
    static async getPeople(patientId) {
        const client = await db.connect();
        try {
            return await PersonModel.findAllByPatientId(client,patientId);
        } finally {
            client.release();
        }
    }

    static async createPerson(patientId,{ name,relationship,image_url }) {
        if (!name || !relationship) {
            throw new Error('Name and relationship are required');
        }

        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const lowerName = name.toLowerCase();

            // Create person record
            const person = await PersonModel.create(client,{ name: lowerName,patientId,relationship });

            // Handle Image Upload
            if (image_url) {
                try {
                    const cloudinaryImage = await cloudinary.uploader.upload(image_url,{
                        folder: `patients/${patientId}/people/${person.person_id}`,
                        public_id: `${patientId}_${person.person_id}_${Date.now()}`,
                        overwrite: false
                    });

                    const updatedPerson = await PersonModel.updateImageUrl(client,person.person_id,cloudinaryImage.secure_url);
                    await client.query('COMMIT');
                    return updatedPerson;
                } catch (uploadError) {
                    // If upload fails, rollback the person creation
                    await client.query('ROLLBACK'); // Rollback the transaction which includes the person creation
                    throw new Error(`Image upload failed: ${uploadError.message}`);
                }
            }

            await client.query('COMMIT');
            return person;

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    static async deletePerson(patientId,personId) {
        const client = await db.connect();
        try {
            return await PersonModel.delete(client,personId,patientId);
        } finally {
            client.release();
        }
    }

    static async toggleFavorite(patientId,personId,favorite) {
        const client = await db.connect();
        try {
            const result = await PersonModel.toggleFavorite(client,personId,patientId,favorite);
            return { success: true,person: result };
        } finally {
            client.release();
        }
    }

    static async updatePerson(patientId,personId,{ name,relationship,image_url }) {
        if (!name || !relationship) {
            throw new Error('Name and relationship are required');
        }

        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const lowerName = name.toLowerCase();

            let person = await PersonModel.update(client,{
                personId,
                patientId,
                name: lowerName,
                relationship
            });

            if (!person) {
                throw new Error('Person not found');
            }

            if (image_url) {
                const cloudinaryImage = await cloudinary.uploader.upload(image_url,{
                    folder: `patients/${patientId}/people/${personId}`,
                    public_id: `${patientId}_${personId}_${Date.now()}`,
                    overwrite: true
                });

                person = await PersonModel.updateImageUrl(client,personId,cloudinaryImage.secure_url);
            }

            await client.query('COMMIT');
            return { success: true,person };

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}

module.exports = PersonService;
