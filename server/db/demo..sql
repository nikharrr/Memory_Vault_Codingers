-- Memory
INSERT INTO Memories (patient_id, title, descrip, image_url, memory_date, favorite)
VALUES
(1, 'Monsoon Walk with Maya', 'Maya and I walked barefoot on wet roads, laughing like kids again.', 'https://example.com/images/maya_monsoon.jpg', '2009-07-19', TRUE);

-- Associated People
INSERT INTO MemoryPeople (memory_id, person_id)
VALUES (19, 9); -- Maya Thomas

-- Tags
INSERT INTO MemoryTags (memory_id, tag_id)
VALUES (19, 8); -- Friends

