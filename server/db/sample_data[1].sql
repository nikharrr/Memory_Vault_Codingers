-- Inserting sample data for 10 patients, including older patients
INSERT INTO patients (full_name, birth_date) VALUES
('Aarav Patel', '1985-07-14'),
('Isha Sharma', '1990-11-25'),
('Arjun Reddy', '1978-03-02'),
('Priya Kapoor', '2000-06-30'),
('Vikram Singh', '1995-02-22'),
('Ananya Desai', '1988-09-15'),
('Ravi Kumar', '1992-01-09'),
-- ('Sanya Gupta', '2001-12-05'),
-- ('Manoj Verma', '1980-04-20'),
-- ('Neha Mehta', '1993-08-12'),
-- ('Suresh Bhatt', '1945-05-21'),   
-- ('Geeta Iyer', '1952-08-14'),      
-- ('Rajesh Choudhury', '1958-12-01'), 
-- ('Meera Nair', '1947-09-11');   


-- For Aarav Patel (Assuming patient_id = 1)
INSERT INTO People (name, relationship, patient_id) VALUES
('Riya Patel', 'Daughter', 1),
('Sunita Patel', 'Wife', 1),
('Mahesh Patel', 'Brother', 1),
('Kiran Patel', 'Sister-in-law', 1),
('Amit Sharma', 'Friend', 1),
('Pooja Verma', 'Friend', 1),
('Nitin Deshmukh', 'Colleague', 1),
('Bhavna Joshi', 'Neighbor', 1),
('Deepak Patel', 'Father', 1),
('Meena Patel', 'Mother', 1);

-- For Isha Sharma (Assuming patient_id = 2)
INSERT INTO People (name, relationship, patient_id) VALUES
('Rahul Sharma', 'Brother', 2),
('Sneha Sharma', 'Sister', 2),
('Vikas Sharma', 'Father', 2),
('Kavita Sharma', 'Mother', 2),
('Rohan Mehta', 'Friend', 2),
('Sonal Gupta', 'Colleague', 2),
('Priyanka Iyer', 'Friend', 2),
('Aditya Reddy', 'Cousin', 2),
('Manish Sharma', 'Uncle', 2),
('Aarti Sharma', 'Aunt', 2);

-- For Arjun Reddy (Assuming patient_id = 3)
INSERT INTO People (name, relationship, patient_id) VALUES
('Pallavi Reddy', 'Wife', 3),
('Karthik Reddy', 'Son', 3),
('Meena Reddy', 'Daughter', 3),
('Suresh Reddy', 'Brother', 3),
('Lakshmi Reddy', 'Sister-in-law', 3),
('Ramesh Gupta', 'Friend', 3),
('Anil Sharma', 'Colleague', 3),
('Jyoti Iyer', 'Friend', 3),
('Satish Verma', 'Neighbor', 3),
('Nirmala Reddy', 'Mother', 3);

-- For Priya Kapoor (Assuming patient_id = 4)
INSERT INTO People (name, relationship, patient_id) VALUES
('Nikhil Kapoor', 'Brother', 4),
('Anjali Kapoor', 'Sister', 4),
('Rakesh Kapoor', 'Father', 4),
('Savita Kapoor', 'Mother', 4),
('Tanvi Deshmukh', 'Friend', 4),
('Krishna Joshi', 'Friend', 4),
('Vishal Mehta', 'Colleague', 4),
('Divya Patel', 'Colleague', 4),
('Harshit Kapoor', 'Cousin', 4),
('Namita Kapoor', 'Aunt', 4);

-- For Vikram Singh (Assuming patient_id = 5)
INSERT INTO People (name, relationship, patient_id) VALUES
('Rohit Singh', 'Brother', 5),
('Kajal Singh', 'Sister', 5),
('Baldev Singh', 'Father', 5),
('Kamla Singh', 'Mother', 5),
('Simran Kaur', 'Friend', 5),
('Armaan Gill', 'Friend', 5),
('Rajiv Sharma', 'Colleague', 5),
('Preeti Verma', 'Colleague', 5),
('Gagan Singh', 'Cousin', 5),
('Harpreet Kaur', 'Cousin', 5);

-- For Ananya Desai (Assuming patient_id = 6)
INSERT INTO People (name, relationship, patient_id) VALUES
('Neeraj Desai', 'Brother', 6),
('Sheetal Desai', 'Sister', 6),
('Vinod Desai', 'Father', 6),
('Radha Desai', 'Mother', 6),
('Siddharth Patel', 'Friend', 6),
('Mona Shah', 'Friend', 6),
('Harsh Iyer', 'Colleague', 6),
('Asmita Rao', 'Colleague', 6),
('Chirag Desai', 'Uncle', 6),
('Uma Desai', 'Aunt', 6);

-- For Ravi Kumar (Assuming patient_id = 7)
INSERT INTO People (name, relationship, patient_id) VALUES
('Puneet Kumar', 'Brother', 7),
('Kritika Kumar', 'Sister', 7),
('Suraj Kumar', 'Father', 7),
('Seema Kumar', 'Mother', 7),
('Dhruv Sharma', 'Friend', 7),
('Megha Gupta', 'Friend', 7),
('Rajesh Deshmukh', 'Colleague', 7),
('Pallavi Iyer', 'Colleague', 7),
('Nilesh Kumar', 'Cousin', 7),
('Shalini Kumar', 'Cousin', 7);

-- For Sanya Gupta (Assuming patient_id = 8)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Karan Gupta', 'Brother', 8),
-- ('Naina Gupta', 'Sister', 8),
-- ('Manoj Gupta', 'Father', 8),
-- ('Kusum Gupta', 'Mother', 8),
-- ('Yash Mehta', 'Friend', 8),
-- ('Anushka Shah', 'Friend', 8),
-- ('Jayant Joshi', 'Colleague', 8),
-- ('Ritika Sharma', 'Colleague', 8),
-- ('Aayush Gupta', 'Cousin', 8),
-- ('Pinky Gupta', 'Cousin', 8);

-- -- For Manoj Verma (Assuming patient_id = 9)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Alok Verma', 'Brother', 9),
-- ('Pallavi Verma', 'Sister', 9),
-- ('Devendra Verma', 'Father', 9),
-- ('Sarita Verma', 'Mother', 9),
-- ('Vipul Sharma', 'Friend', 9),
-- ('Shraddha Iyer', 'Friend', 9),
-- ('Sandeep Patel', 'Colleague', 9),
-- ('Neha Desai', 'Colleague', 9),
-- ('Prateek Verma', 'Cousin', 9),
-- ('Anita Verma', 'Cousin', 9);

-- -- For Neha Mehta (Assuming patient_id = 10)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Rohan Mehta', 'Brother', 10),
-- ('Priya Mehta', 'Sister', 10),
-- ('Shyam Mehta', 'Father', 10),
-- ('Leena Mehta', 'Mother', 10),
-- ('Kabir Deshmukh', 'Friend', 10),
-- ('Ishita Sharma', 'Friend', 10),
-- ('Varun Patel', 'Colleague', 10),
-- ('Snehal Gupta', 'Colleague', 10),
-- ('Mayank Mehta', 'Cousin', 10),
-- ('Asha Mehta', 'Aunt', 10);

-- -- For Suresh Bhatt (Assuming patient_id = 11)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Narayan Bhatt', 'Brother', 11),
-- ('Kamala Bhatt', 'Sister', 11),
-- ('Ganesh Bhatt', 'Son', 11),
-- ('Uma Bhatt', 'Daughter-in-law', 11),
-- ('Siddhi Bhatt', 'Granddaughter', 11),
-- ('Aryan Bhatt', 'Grandson', 11),
-- ('Krishna Menon', 'Friend', 11),
-- ('Indira Bhatt', 'Wife', 11),
-- ('Dinesh Bhatt', 'Nephew', 11),
-- ('Sunita Bhatt', 'Niece', 11);

-- -- For Geeta Iyer (Assuming patient_id = 12)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Suresh Iyer', 'Brother', 12),
-- ('Latha Iyer', 'Sister', 12),
-- ('Rahul Iyer', 'Son', 12),
-- ('Priya Iyer', 'Daughter-in-law', 12),
-- ('Riya Iyer', 'Granddaughter', 12),
-- ('Varun Iyer', 'Grandson', 12),
-- ('Meera Nair', 'Friend', 12),
-- ('Ravi Iyer', 'Husband', 12),
-- ('Vinod Iyer', 'Nephew', 12),
-- ('Rekha Iyer', 'Niece', 12);

-- -- For Rajesh Choudhury (Assuming patient_id = 13)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Amit Choudhury', 'Son', 13),
-- ('Neha Choudhury', 'Daughter-in-law', 13),
-- ('Sahil Choudhury', 'Grandson', 13),
-- ('Poonam Choudhury', 'Granddaughter', 13),
-- ('Anup Choudhury', 'Brother', 13),
-- ('Divya Choudhury', 'Sister-in-law', 13),
-- ('Rajiv Mehta', 'Friend', 13),
-- ('Suman Choudhury', 'Wife', 13),
-- ('Harsh Choudhury', 'Nephew', 13),
-- ('Naina Choudhury', 'Niece', 13);

-- -- For Meera Nair (Assuming patient_id = 14)
-- INSERT INTO People (name, relationship, patient_id) VALUES
-- ('Vishal Nair', 'Son', 14),
-- ('Swati Nair', 'Daughter-in-law', 14),
-- ('Ananya Nair', 'Granddaughter', 14),
-- ('Rohan Nair', 'Grandson', 14),
-- ('Krishnan Nair', 'Brother', 14),
-- ('Sudha Nair', 'Sister', 14),
-- ('Arvind Menon', 'Friend', 14),
-- ('Padma Nair', 'Friend', 14),
-- ('Sandeep Nair', 'Nephew', 14),
-- ('Anjali Nair', 'Niece', 14);



-- Tags for Alzheimer's memory archive
INSERT INTO tags (name) VALUES
('Family'),
('Childhood'),
('Spouse'),
('Parent'),
('Grandparent'),
('Siblings'),
('Home'),
('Vacation'),
('Favorite Place'),
('Pets'),
('Birthday'),
('Wedding'),
('Anniversary'),
('Friends'),
('Work'),
('School'),
('Religious Event'),
('Holiday'),
('Health'),
('Music'),
('Food');



-- Memories for Patients

INSERT INTO Memories (patient_id, title, descrip, image_url, memory_date) VALUES

-- Memories for Aarav Patel (patient_id = 1)
(1, 'Graduation Day', 'Completed engineering degree with honors.', 'images/patient_1_memory_1.jpg', '2007-05-10'),
(1, 'Wedding Ceremony', 'Married Sunita surrounded by family.', 'images/patient_1_memory_2.jpg', '2010-12-20'),
--(1, 'First Job', 'Started first job at Infosys.', 'images/patient_1_memory_3.jpg', '2008-07-01'),
(1, 'Trip to Manali', 'Adventurous trip with college friends.', 'images/patient_1_memory_4.jpg', '2009-09-15'),
-- (1, 'Bought First Car', 'Purchased a Maruti Suzuki.', 'images/patient_1_memory_5.jpg', '2012-03-18'),
(1, 'Daughter’s Birth', 'Welcomed Riya into the world.', 'images/patient_1_memory_6.jpg', '2013-06-22'),
-- (1, 'Housewarming', 'Moved into our dream home.', 'images/patient_1_memory_7.jpg', '2014-11-05'),
-- (1, 'Family Picnic', 'Spent quality time at Lonavala.', 'images/patient_1_memory_8.jpg', '2015-08-10'),
-- (1, 'Promotion', 'Promoted to senior project manager.', 'images/patient_1_memory_9.jpg', '2017-04-14'),
(1, 'Trip to Singapore', 'First international vacation.', 'images/patient_1_memory_10.jpg', '2018-02-26'),

-- Memories for Isha Sharma (patient_id = 2)
(2, 'School Farewell', 'Last day with my childhood friends.', 'images/patient_2_memory_1.jpg', '2007-03-30'),
--(2, 'College Fest', 'Organized the annual college festival.', 'images/patient_2_memory_2.jpg', '2010-10-10'),
--(2, 'First Salary', 'Received my first paycheck.', 'images/patient_2_memory_3.jpg', '2011-07-01'),
--(2, 'Sibling’s Wedding', 'Rahul got married!', 'images/patient_2_memory_4.jpg', '2013-01-22'),
--(2, 'Trip to Goa', 'Fun-filled trip with friends.', 'images/patient_2_memory_5.jpg', '2014-12-15'),
(2, 'Marathon Finish', 'Completed my first 10K marathon.', 'images/patient_2_memory_6.jpg', '2016-09-25'),
-- (2, 'New Apartment', 'Moved into my own place.', 'images/patient_2_memory_7.jpg', '2017-07-14'),
-- (2, 'Europe Tour', 'Visited Paris, Rome, and Amsterdam.', 'images/patient_2_memory_8.jpg', '2018-05-20'),
-- (2, 'Work Recognition', 'Awarded employee of the year.', 'images/patient_2_memory_9.jpg', '2019-11-18'),
-- (2, 'Nephew’s Birth', 'Welcomed little Aryan.', 'images/patient_2_memory_10.jpg', '2020-06-05'),

-- Memories for Arjun Reddy (patient_id = 3)
(3, 'Medical College Admission', 'Dream came true.', 'images/patient_3_memory_1.jpg', '1996-07-01'),
(3, 'Internship at Hospital', 'First patient interaction.', 'images/patient_3_memory_2.jpg', '1999-05-18'),
-- (3, 'Married Pallavi', 'Best day of my life.', 'images/patient_3_memory_3.jpg', '2001-02-10'),
-- (3, 'Son’s First Step', 'Karthik’s first steps.', 'images/patient_3_memory_4.jpg', '2003-06-10'),
-- (3, 'Family Vacation to Kashmir', 'Snowy adventures.', 'images/patient_3_memory_5.jpg', '2005-12-23'),
-- (3, 'Hospital Recognition', 'Best doctor award.', 'images/patient_3_memory_6.jpg', '2008-09-15'),
-- (3, 'Bought Our Own Clinic', 'Launched private practice.', 'images/patient_3_memory_7.jpg', '2010-03-20'),
-- (3, 'Parents’ Golden Jubilee', 'Celebrated 50 years of their marriage.', 'images/patient_3_memory_8.jpg', '2011-04-15'),
-- (3, 'Daughter’s Graduation', 'Meena graduated with distinction.', 'images/patient_3_memory_9.jpg', '2015-06-18'),
-- (3, 'Pilgrimage to Tirupati', 'Spiritual trip.', 'images/patient_3_memory_10.jpg', '2018-11-11'),

-- Similarly, you would repeat for patient_id = 4 to 14...


-- Priya Kapoor (4)
(4, 'Childhood Dance Show', 'First stage performance.', 'images/patient_4_memory_1.jpg', '2007-12-20'),
(4, 'School Science Fair', 'Won first prize for volcano model.', 'images/patient_4_memory_2.jpg', '2011-02-15'),
-- (4, 'College Freshers', 'Met my best friends.', 'images/patient_4_memory_3.jpg', '2018-08-01'),
-- (4, 'Trip to Jaipur', 'Explored the pink city.', 'images/patient_4_memory_4.jpg', '2019-11-15'),
-- (4, 'Internship in Bangalore', 'Learned so much in 3 months.', 'images/patient_4_memory_5.jpg', '2020-04-10'),
-- (4, 'Graduated B.Com', 'Proud moment for family.', 'images/patient_4_memory_6.jpg', '2022-05-25'),
-- (4, 'Joined MBA College', 'New journey begins.', 'images/patient_4_memory_7.jpg', '2023-07-10'),
-- (4, 'First Trek', 'Climbed Kalsubai peak.', 'images/patient_4_memory_8.jpg', '2023-09-14'),
-- (4, 'Cousin’s Wedding', 'Fun and laughter all day.', 'images/patient_4_memory_9.jpg', '2024-01-10'),
-- (4, 'Got First Internship Offer', 'Excited to start corporate life.', 'images/patient_4_memory_10.jpg', '2024-04-05'),

-- Vikram Singh (5)
-- (5, 'Childhood Cricket Match', 'Hit the winning six.', 'images/patient_5_memory_1.jpg', '2005-05-20'),
-- (5, 'School Annual Day', 'Best actor award.', 'images/patient_5_memory_2.jpg', '2010-12-10'),
-- (5, 'First Bike Ride', 'Rode Royal Enfield for first time.', 'images/patient_5_memory_3.jpg', '2013-06-15'),
-- (5, 'Graduation Party', 'Crazy night with friends.', 'images/patient_5_memory_4.jpg', '2016-05-22'),
-- (5, 'Joined TCS', 'First day of professional life.', 'images/patient_5_memory_5.jpg', '2017-07-01'),
-- (5, 'Road Trip to Ladakh', 'Once in a lifetime adventure.', 'images/patient_5_memory_6.jpg', '2018-08-20'),
(5, 'Sister’s Engagement', 'Family celebration.', 'images/patient_5_memory_7.jpg', '2019-01-05'),
-- (5, 'New House', 'Shifted to Delhi.', 'images/patient_5_memory_8.jpg', '2021-02-15'),
(5, 'Promotion at Work', 'Hard work paid off.', 'images/patient_5_memory_9.jpg', '2022-06-10'),
-- (5, 'Completed Certification', 'PMP Certified.', 'images/patient_5_memory_10.jpg', '2023-03-30'),


-- Ananya Desai (6)
-- (6, 'First Dance Competition', 'Won gold medal at district level.', 'images/patient_6_memory_1.jpg', '2005-09-25'),
-- (6, 'Family Trip to Kerala', 'Houseboat ride memories.', 'images/patient_6_memory_2.jpg', '2008-12-18'),
-- (6, 'School Farewell', 'Bittersweet goodbye.', 'images/patient_6_memory_3.jpg', '2009-03-15'),
-- (6, 'College Best Student Award', 'Awarded best all-rounder.', 'images/patient_6_memory_4.jpg', '2010-05-20'),
-- (6, 'MBA Admission', 'Joined Symbiosis Pune.', 'images/patient_6_memory_5.jpg', '2012-07-05'),
(6, 'Met Best Friend', 'Met Ria, who became like a sister.', 'images/patient_6_memory_6.jpg', '2012-09-22'),
-- (6, 'Internship at Amazon', 'Learned a lot.', 'images/patient_6_memory_7.jpg', '2013-04-14'),
(6, 'First International Trip', 'Traveled to Dubai.', 'images/patient_6_memory_8.jpg', '2015-11-11'),
--(6, 'Promotion to Manager', 'Biggest career jump.', 'images/patient_6_memory_9.jpg', '2018-03-19'),
--(6, 'Brother’s Marriage', 'Grand family reunion.', 'images/patient_6_memory_10.jpg', '2020-01-25'),

-- Ravi Kumar (7)
(7, 'Cricket Trophy', 'Led school team to victory.', 'images/patient_7_memory_1.jpg', '2007-01-20'),
-- (7, 'Math Olympiad', 'Won state-level competition.', 'images/patient_7_memory_2.jpg', '2008-12-05'),
-- (7, 'Joined Engineering College', 'New journey started.', 'images/patient_7_memory_3.jpg', '2010-08-01'),
-- (7, 'Trip to Rajasthan', 'Camel ride in Jaisalmer.', 'images/patient_7_memory_4.jpg', '2011-12-30'),
-- (7, 'First Job', 'Selected at campus placement.', 'images/patient_7_memory_5.jpg', '2013-06-15'),
-- (7, 'Parents’ 25th Anniversary', 'Grand celebration.', 'images/patient_7_memory_6.jpg', '2014-02-20'),
-- (7, 'Trip to Maldives', 'Dream vacation.', 'images/patient_7_memory_7.jpg', '2016-04-05'),
-- (7, 'New Pet', 'Adopted a Labrador puppy.', 'images/patient_7_memory_8.jpg', '2017-07-18'),
-- (7, 'Sister’s Graduation', 'Proud brother moment.', 'images/patient_7_memory_9.jpg', '2018-06-20'),
(7, 'First Home Bought', 'Moved into my apartment.', 'images/patient_7_memory_10.jpg', '2020-09-10'),

-- -- Sanya Gupta (8)
-- (8, 'Won Painting Competition', 'State-level champion.', 'images/patient_8_memory_1.jpg', '2010-02-15'),
-- (8, 'School Annual Play', 'Played lead role.', 'images/patient_8_memory_2.jpg', '2012-12-10'),
-- (8, 'Trip to Andaman', 'Snorkeling adventure.', 'images/patient_8_memory_3.jpg', '2014-05-08'),
-- (8, 'Graduated 12th Grade', 'Topper in school.', 'images/patient_8_memory_4.jpg', '2018-03-20'),
-- (8, 'Joined Design College', 'Following passion.', 'images/patient_8_memory_5.jpg', '2018-07-12'),
-- (8, 'Won National Art Contest', 'Featured in magazine.', 'images/patient_8_memory_6.jpg', '2019-10-25'),
-- (8, 'Trip to Europe', 'Visited Italy and Spain.', 'images/patient_8_memory_7.jpg', '2021-08-30'),
-- (8, 'Started Own Art Studio', 'Dream come true.', 'images/patient_8_memory_8.jpg', '2022-05-14'),
-- (8, 'First Art Exhibition', 'Displayed own collection.', 'images/patient_8_memory_9.jpg', '2023-03-05'),
-- (8, 'Won Entrepreneurship Award', 'Recognized for art startup.', 'images/patient_8_memory_10.jpg', '2024-01-25'),

-- -- Manoj Verma (9)
-- (9, 'First Bicycle Ride', 'Fell but kept trying.', 'images/patient_9_memory_1.jpg', '1987-11-20'),
-- (9, 'School Topper', 'Stood first in board exams.', 'images/patient_9_memory_2.jpg', '1996-05-15'),
-- (9, 'Admission to IIT', 'Family was so proud.', 'images/patient_9_memory_3.jpg', '1998-07-10'),
-- (9, 'College Cultural Fest', 'Sang at cultural night.', 'images/patient_9_memory_4.jpg', '1999-10-12'),
-- (9, 'First Job at Infosys', 'Dream achieved.', 'images/patient_9_memory_5.jpg', '2002-06-01'),
-- (9, 'Marriage to Anjali', 'Most beautiful day.', 'images/patient_9_memory_6.jpg', '2004-02-14'),
-- (9, 'Daughter’s First Birthday', 'Family gathering.', 'images/patient_9_memory_7.jpg', '2006-09-09'),
-- (9, 'US Onsite Assignment', 'Moved to New York.', 'images/patient_9_memory_8.jpg', '2008-05-20'),
-- (9, 'Bought Dream Home', 'Big milestone.', 'images/patient_9_memory_9.jpg', '2012-11-11'),
-- (9, 'Trip to Grand Canyon', 'Breathtaking views.', 'images/patient_9_memory_10.jpg', '2015-07-19'),

-- -- Neha Mehta (10)
-- (10, 'Best Outgoing Student Award', 'School farewell day.', 'images/patient_10_memory_1.jpg', '2010-04-10'),
-- (10, 'Family Trip to Sikkim', 'Snow and waterfalls.', 'images/patient_10_memory_2.jpg', '2011-12-28'),
-- (10, 'Fashion Show Walk', 'Walked for NGO.', 'images/patient_10_memory_3.jpg', '2013-11-22'),
-- (10, 'First Internship', 'Learned corporate culture.', 'images/patient_10_memory_4.jpg', '2014-05-01'),
-- (10, 'Graduation Ceremony', 'Cap and gown moment.', 'images/patient_10_memory_5.jpg', '2015-04-30'),
-- (10, 'Started Fitness Journey', 'Health became priority.', 'images/patient_10_memory_6.jpg', '2016-01-01'),
-- (10, 'Won Dance Contest', 'Performed classical Kathak.', 'images/patient_10_memory_7.jpg', '2018-03-17'),
-- (10, 'First Trek to Valley of Flowers', 'Nature’s paradise.', 'images/patient_10_memory_8.jpg', '2019-08-11'),
-- (10, 'Moved to Mumbai', 'Chasing dreams.', 'images/patient_10_memory_9.jpg', '2021-06-18'),
-- (10, 'Started YouTube Channel', 'Shared passion for art.', 'images/patient_10_memory_10.jpg', '2023-01-20'),

-- -- Suresh Bhatt (11)
-- (11, 'Partition Memories', 'Hardships faced during childhood.', 'images/patient_11_memory_1.jpg', '1947-08-15'),
-- (11, 'Village Fair', 'Played games and won a toy.', 'images/patient_11_memory_2.jpg', '1955-02-10'),
-- (11, 'Joined Indian Army', 'Proud moment.', 'images/patient_11_memory_3.jpg', '1965-05-01'),
-- (11, 'Marriage Ceremony', 'Married Savitri Devi.', 'images/patient_11_memory_4.jpg', '1967-03-14'),
-- (11, 'Birth of First Son', 'Felt blessed.', 'images/patient_11_memory_5.jpg', '1969-09-20'),
-- (11, 'Built Ancestral Home', 'Dream fulfilled.', 'images/patient_11_memory_6.jpg', '1975-12-01'),
-- (11, 'Pilgrimage to Varanasi', 'Spiritual enlightenment.', 'images/patient_11_memory_7.jpg', '1980-04-20'),
-- (11, 'Retirement Ceremony', 'Honored for service.', 'images/patient_11_memory_8.jpg', '1995-11-10'),
-- (11, 'Granddaughter’s Birth', 'Family grew.', 'images/patient_11_memory_9.jpg', '2000-05-22'),
-- (11, 'Golden Jubilee', '50 years of marriage celebration.', 'images/patient_11_memory_10.jpg', '2017-03-14'),

-- -- Geeta Iyer (12)
-- (12, 'Traditional Dance Performance', 'Bharatanatyam debut.', 'images/patient_12_memory_1.jpg', '1968-06-05'),
-- (12, 'Teaching Career Start', 'First school appointment.', 'images/patient_12_memory_2.jpg', '1975-07-01'),
-- (12, 'Marriage to Mr. Iyer', 'Happy beginnings.', 'images/patient_12_memory_3.jpg', '1976-12-20'),
-- (12, 'Birth of Daughter', 'Blessed with Lakshmi.', 'images/patient_12_memory_4.jpg', '1978-08-15'),
-- (12, 'Family Trip to Mysore', 'Palace and gardens visit.', 'images/patient_12_memory_5.jpg', '1985-12-05'),
-- (12, 'Teacher’s Award', 'Best educator recognition.', 'images/patient_12_memory_6.jpg', '1992-09-05'),
-- (12, 'Daughter’s Wedding', 'Emotional and joyful.', 'images/patient_12_memory_7.jpg', '2000-02-10'),
-- (12, 'Pilgrimage to Rameshwaram', 'Spiritual journey.', 'images/patient_12_memory_8.jpg', '2003-11-14'),
-- (12, 'Grandson’s Birth', 'New joy in life.', 'images/patient_12_memory_9.jpg', '2006-03-09'),
-- (12, 'Retirement Party', 'Celebration of career.', 'images/patient_12_memory_10.jpg', '2012-05-31'),

-- -- Rajesh Choudhury (13)
-- (13, 'Childhood River Swims', 'Carefree days.', 'images/patient_13_memory_1.jpg', '1966-07-18'),
-- (13, 'Joined Railways', 'First government job.', 'images/patient_13_memory_2.jpg', '1978-04-01'),
-- (13, 'Marriage Celebration', 'Traditional Bengali wedding.', 'images/patient_13_memory_3.jpg', '1981-01-20'),
-- (13, 'First House Purchase', 'Proud milestone.', 'images/patient_13_memory_4.jpg', '1985-10-10'),
-- (13, 'Children’s Sports Day', 'Cheered from stands.', 'images/patient_13_memory_5.jpg', '1990-12-15'),
-- (13, 'Religious Trip to Puri', 'Visited Jagannath temple.', 'images/patient_13_memory_6.jpg', '1995-06-18'),
-- (13, 'Promotion to Inspector', 'Career growth.', 'images/patient_13_memory_7.jpg', '1998-08-25'),
-- (13, 'Daughter’s Graduation', 'Proud father moment.', 'images/patient_13_memory_8.jpg', '2004-05-10'),
-- (13, 'Retirement Ceremony', 'Felt honored and loved.', 'images/patient_13_memory_9.jpg', '2018-07-01'),
-- (13, 'Golden Wedding Anniversary', 'Celebrated with children and grandchildren.', 'images/patient_13_memory_10.jpg', '2024-02-20'),

-- -- Meera Nair (14)
-- (14, 'Learning Carnatic Music', 'First music recital.', 'images/patient_14_memory_1.jpg', '1955-05-01'),
-- (14, 'Marriage Day', 'Wore traditional Kanjeevaram sari.', 'images/patient_14_memory_2.jpg', '1970-11-22'),
-- (14, 'First Temple Visit after Marriage', 'Blessings for new life.', 'images/patient_14_memory_3.jpg', '1970-12-01'),
-- (14, 'Birth of Son', 'Joy of motherhood.', 'images/patient_14_memory_4.jpg', '1973-04-18'),
-- (14, 'Family Trip to Ooty', 'Chilly weather and tea gardens.', 'images/patient_14_memory_5.jpg', '1980-06-10'),
-- (14, 'Started Handloom Business', 'Entrepreneurial step.', 'images/patient_14_memory_6.jpg', '1985-09-01'),
-- (14, 'Granddaughter’s Birth', 'Happiness multiplied.', 'images/patient_14_memory_7.jpg', '2000-01-15'),
-- (14, 'Retirement Celebration', 'Felt accomplished.', 'images/patient_14_memory_8.jpg', '2005-03-05'),
-- (14, 'Pilgrimage to Sabarimala', 'Spiritual bliss.', 'images/patient_14_memory_9.jpg', '2010-12-22'),
-- (14, '80th Birthday', 'Big family celebration.', 'images/patient_14_memory_10.jpg', '2024-09-11');


DO $$
DECLARE
    mem_id INT;
    tag_ids INT[];
    tag_id INT;
BEGIN
    FOR mem_id IN SELECT memory_id FROM Memories LOOP
        -- Pick 2 or 3 random tags
        SELECT ARRAY(
            SELECT t.tag_id  -- Using alias "t" for Tags table
            FROM Tags t
            ORDER BY RANDOM() 
            LIMIT FLOOR(RANDOM() * 2 + 2)  -- 2 or 3 tags
        ) INTO tag_ids;
        
        -- Insert into MemoryTags
        FOREACH tag_id IN ARRAY tag_ids
        LOOP
            INSERT INTO MemoryTags (memory_id, tag_id)
            VALUES (mem_id, tag_id)
            ON CONFLICT DO NOTHING;
        END LOOP;
    END LOOP;
END $$;


DO $$
DECLARE
    mem_rec RECORD;
    p_ids INT[];
    p_id INT;
BEGIN
    -- For each memory, find the patient's related people
    FOR mem_rec IN
        SELECT m.memory_id, m.patient_id
        FROM Memories m
    LOOP
        -- Get 1 to 3 random people linked to this patient
        SELECT ARRAY(
            SELECT person_id
            FROM People
            WHERE patient_id = mem_rec.patient_id
            ORDER BY RANDOM()
            LIMIT FLOOR(RANDOM() * 3 + 1)  -- 1 to 3 people
        ) INTO p_ids;
        
        -- Insert each person for the memory
        FOREACH p_id IN ARRAY p_ids
        LOOP
            INSERT INTO MemoryPeople (memory_id, person_id)
            VALUES (mem_rec.memory_id, p_id)
            ON CONFLICT DO NOTHING;  -- in case of duplicates
        END LOOP;
    END LOOP;
END $$;
