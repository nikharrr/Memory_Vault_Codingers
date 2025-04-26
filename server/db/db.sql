-- Drop tables if they already exist (safe reset during development)
DROP TABLE IF EXISTS memories, patients, peopleInvolved, memoryTags, tags CASCADE;

-- Patients table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (birth_date <= CURRENT_DATE)
);

-- Memories table
CREATE TABLE memories (
    memory_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255),
    descrip TEXT NOT NULL,
    memory_date DATE CHECK (memory_date <= CURRENT_DATE),
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- People involved in a memory
CREATE TABLE peopleInvolved (
    person_id SERIAL PRIMARY KEY,
    memory_id INT NOT NULL REFERENCES memories(memory_id) ON DELETE CASCADE ON UPDATE CASCADE,
    name_person VARCHAR(100) NOT NULL,
    relationship VARCHAR(100) NOT NULL
);

-- Tags table (for memory tagging)
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- MemoryTags table (many-to-many between Memories and Tags)
CREATE TABLE memoryTags (
    memory_id INT REFERENCES memories(memory_id) ON DELETE CASCADE ON UPDATE CASCADE,
    tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (memory_id, tag_id)
);