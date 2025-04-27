-- Drop tables if they already exist (safe reset during development)
DROP TABLE IF EXISTS memories, patients, peopleInvolved, memoryTags, tags CASCADE;

-- Patients table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (birth_date <= CURRENT_DATE)
);

-- People table
CREATE TABLE People (
    person_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    patient_id INT REFERENCES Patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE,
    relationship VARCHAR(100)
);

-- Memories table
CREATE TABLE Memories (
    memory_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    title VARCHAR(255),
    descrip TEXT NOT NULL,
    image_url TEXT,  -- path or URL to the uploaded image
    memory_date DATE CHECK (memory_date <= CURRENT_DATE),
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE Tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT REFERENCES Patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- MemoryTags table (Many-to-Many between Memories and Tags)
CREATE TABLE MemoryTags (
    memory_id INT REFERENCES Memories(memory_id) ON DELETE CASCADE ON UPDATE CASCADE,
    tag_id INT REFERENCES Tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (memory_id, tag_id)
);

-- MemoryPeople table (Many-to-Many between Memories and People)
CREATE TABLE MemoryPeople (
    memory_id INT REFERENCES Memories(memory_id) ON DELETE CASCADE ON UPDATE CASCADE,
    person_id INT REFERENCES People(person_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (memory_id, person_id)
);