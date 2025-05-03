INSERT INTO patients (full_name, email, password, birth_date)
VALUES 
('Savitri Deshmukh', 'savitri.deshmukh@example.com', 'savitri789', '1952-11-05'),
('Harish Patel', 'harish.patel@example.com', 'harish321', '1947-06-18');


INSERT INTO people (name, patient_id, relationship, image_url, favorite)
VALUES
('Vikram Joshi', 1, 'Son', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100054/Screenshot_2025-04-30_230134_dncvlf.png', TRUE),
('Meena Rane', 1, 'Daughter-in-law', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100060/Screenshot_2025-04-30_225311_lgkme5.png', FALSE),
('Anita Sehgal', 1, 'Daughter', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100058/Screenshot_2025-04-30_224627_ivjore.png', TRUE),
('Amit Banerjee', 1, 'Grandson', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746102138/Screenshot_2025-05-01_175202_hfraha.png', FALSE),
('Naina Kapoor', 1, 'Granddaughter', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100049/Screenshot_2025-04-30_225417_mciv8d.png', TRUE),
('Radha Pawar', 1, 'Younger Sister', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100048/Screenshot_2025-04-30_225549_f6yvh2.png', TRUE),
('Suresh Nair', 1, 'Elder Brother', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100046/Screenshot_2025-04-30_225812_cspmng.png', FALSE),
('Dr. Shalini Verma', 1, 'Family Doctor', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100044/Screenshot_2025-04-30_224731_vsw76u.png', TRUE),
('Maya Thomas', 1, 'Childhood Friend', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100042/Screenshot_2025-04-30_224854_eoimiq.png', TRUE),
('Usha Banerjee', 1, 'Spiritual Guide', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100040/Screenshot_2025-04-30_230046_jakh5g.png', TRUE),
('Kavita Kulkarni', 1, 'Old College Friend', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100038/Screenshot_2025-04-30_224824_lglqzx.png', FALSE),
('Deepak Rawat', 1, 'Family Friend', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100036/Screenshot_2025-04-30_224700_ltu9ym.png', FALSE),
('Sunita Fernandes', 1, 'Retired Colleague', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100035/Screenshot_2025-04-30_225738_xv76ni.png', FALSE),
('Ramesh Saxena', 1, 'Friend from Temple Group', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100437/Screenshot_2025-05-01_172328_qkuub9.png', FALSE),
('Ajit Menon', 1, 'Cousin', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100033/Screenshot_2025-04-30_224205_nfwtdr.png', FALSE);

INSERT INTO Memories (
    patient_id,
    title,
    descrip,
    image_url,
    memory_date,
    favorite
)
VALUES 
(1, 'Holi at Vikram''s House', 
    'The courtyard burst with colors as little Amit and Naina ran around shrieking with joy. Vikram applied a soft smear of pink on my cheek and said, "Happy Holi, Aai." I remember the sweet aroma of gujiyas and the sound of the dhol echoing through the lane. My white saree, once crisp, was now a canvas of laughter, love, and celebration. Even the sky seemed to join us in joy, showering golden sunlight over our cheerful chaos.',
    'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746108347/Screenshot_2025-05-01_193527_gf0tfg.png',
    '2024-03-25',
    TRUE
),

(1, 'Morning Walks with Radha', 
    'Every morning that March, Radha and I walked through the gulmohar-lined paths. We talked about our childhood in Satara, reliving those tiny joys hidden in forgotten corners of memory. The cool breeze would carry the fragrance of wet earth and blooming champa, and our footsteps created a rhythm only old friends could understand. Sometimes, we''d sit on the park bench in silence, watching squirrels chase each other, wrapped in the comfort of shared silence and sunshine.',
    'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746108479/123706200-portrait-of-a-elderly-asian-woman-with-young-women-walking-outdoor-together-in-the-morning-happy-and_peeeg5.jpg',
    '2024-03-10',
    TRUE
),

(1, 'Temple Fair with Naina', 
    'Naina held my hand as we laughed like young girls again, bargaining at stalls and eating piping hot batata vadas. The fair was crowded, but my heart felt light. The scent of incense and roasted corn filled the air as temple bells chimed softly in the distance. We tried on glass bangles that clinked with every move and shared a kulfi that dripped faster than we could eat. That day, amidst the lights and sounds, I felt the pulse of life again—joyful, chaotic, and beautifully alive.',
    'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746108795/Screenshot_2025-05-01_194301_x4eana.png',
    '2024-03-17',
    TRUE
);

INSERT INTO Memories (patient_id, title, descrip, image_url, memory_date, favorite)
VALUES
(1, 'Vikram''s First School Day', 'The crisp morning air carried the scent of new books and polished shoes as I held Vikram''s small, sweaty hand. His oversized backpack bounced with each nervous step. When the school bell rang, he turned with those big Joshi-family eyes - just like his grandfather''s - and gave me a brave smile before joining the other children in their blue uniforms.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746097539/Screenshot_2025-04-30_231511_akvxfw.png', '1983-06-15', TRUE),
(1, 'Meena''s First Puran Poli', 'The kitchen filled with the caramel aroma of melting jaggery as Meena carefully flipped the golden poli on the tava. Vikram hovered like a hungry puppy, earning playful swats with her spatula. "Wait for Amma!" she chided, but still sneaked him a piece. The sweet, ghee-soaked bread stuck to our fingers as we ate, laughing at Vikram''s dramatic chewing.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746097611/Screenshot_2025-04-30_231615_dlcy9x.png', '2012-04-22', TRUE),
(1, 'Anita''s College Graduation', 'The marigold garland around Anita''s neck released bursts of citrusy fragrance each time she moved. When her name echoed in the auditorium, she glanced back at me - that same proud look she had when winning childhood races. Her graduation cap slipped sideways as she hugged me, whispering "Your sacrifices made this possible" into my shoulder.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746097680/Screenshot_2025-04-30_231719_bgv4rl.png', '2003-03-15', TRUE),
(1, 'Amit''s Krishna Natyam', 'The stage lights made Amit''s peacock-feather crown glow blue as he twirled, his bells jingling wildly. When he pretended to steal butter from the "gopis," his exaggerated wink to the audience sent ripples of laughter through the hall. Afterward, his sticky, makeup-smeared cheeks pressed against mine as he demanded, "Did I look like real Krishna, Ajji?"', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746098160/Screenshot_2025-04-30_231819_jhusat.png', '2010-01-26', TRUE),
(1, 'Naina''s Sparkly Birthday', 'Pink frosting smudged Naina''s nose as she blew out the candles with all the dramatic breath her 10-year-old lungs could muster. The living room shimmered with fallen glitter from her dress, sticking to our hands as we clapped. Amit "helped" unwrap gifts, his own face lighting up with each of her delighted squeals.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099184/Screenshot_2025-04-30_231931_z1qnae.png', '2015-07-14', TRUE),
(1, 'Radha''s Rakhi Ritual', 'Radha''s arthritic fingers struggled with the silk thread until I covered her hands with mine, just as I did when we were girls. The coconut-and-jaggery prasad tasted exactly like Amma used to make. "Remember how we''d fight over who got the bigger ladoo?" she chuckled, her silver bangles clinking against my wrist.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099606/Screenshot_2025-04-30_232108_1_mbuwpf.png', '2005-08-19', TRUE),
(1, 'Suresh''s Winter Visit', 'Frost decorated the windowpanes as Suresh burst in, his wool coat smelling of Delhi winters and the jalebi syrup leaking through the box. "The shopkeeper remembered you like them extra crispy," he grinned, feeding me a piece like we were children again. His stories of our childhood mischief warmed the room better than the heater.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099650/Screenshot_2025-04-30_232232_nloni6.png', '2002-12-01', TRUE),
(1, 'Dr. Shalini''s Reassurance', 'The antiseptic smell of the clinic faded when Dr. Shalini took my hands in hers, her gold bangles cool against my skin. "Your strength flows through your family," she said, placing my palm over my heart. The lavender oil she dabbed on my wrists became my armor against fear.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099813/Screenshot_2025-04-30_232347_h4f9pw.png', '2018-09-22', TRUE),
(1, 'Maya''s Veranda Stories', 'Maya''s veranda swing creaked rhythmically as we shared a single shawl. The cardamom from our chai mingled with the jasmine climbing her trellis. When she imitated Sister Agnes''s strict voice, our laughter startled the mynah birds into flight - just like it had fifty years ago in the schoolyard.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099859/Screenshot_2025-04-30_232507_gfmawp.png', '2011-05-04', TRUE),
(1, 'Usha''s Bhajan Circle', 'The harmonium wheezed as Usha''s voice rose above ours in "Vaishnav Janato." Incense smoke curled around her face like a blessing. My dholak''s rhythm faltered when tears came, but her steady nod said, "Keep going." The temple bells marked time as our voices blended into something holy.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099923/Screenshot_2025-04-30_232625_bgmrsu.png', '2013-11-14', TRUE),
(1, 'Kavita''s College Canteen', 'The steel tumbler of filter coffee burned my fingers as Kavita and I argued over whose turn it was to pay. The canteen''s permanent smell of sambar and notebook paper transported us back to debating poetry instead of grandchildren. Her signature rose-scented hair oil still lingered when we hugged goodbye.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746099984/Screenshot_2025-04-30_232734_zpepfd.png', '1969-09-20', TRUE),
(1, 'Deepak''s Poetry Evening', 'Deepak''s voice cracked on the line about "mothers becoming grandmothers." In the audience, I smoothed Amit''s hair as he slept against my shoulder, his weight familiar and precious. The handwritten dedication in Deepak''s book read: "For Savitri-ji, who taught me love has no meter."', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100038/Screenshot_2025-04-30_233039_wepexq.png', '2016-03-10', TRUE),
(1, 'Sunita''s Farewell Speech', 'Sunita''s white sari glowed under the auditorium lights as she described her first day teaching us. When she mentioned how I''d brought her lime pickle sandwiches during her pregnancy, the room erupted in knowing laughter. Thirty years of chalk dust and shared dreams hung in that applause.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746102001/Screenshot_2025-04-30_233237_duwbnz.png', '2005-03-30', TRUE),
(1, 'Gudi Padwa with Ramesh', 'The neem leaves crunched underfoot as Ramesh helped me hang the gudi. His off-key singing of "Jai Devi Durge" made me laugh until the turmeric-and-vermilion mixture dripped down our hands. The morning sun through the temple arches painted everything in hopeful gold.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100141/Screenshot_2025-05-01_091820_p8kztc.png', '2014-03-31', TRUE),
(1, 'Ajit''s New Home', 'Ajit''s balcony overlooked the exact Pune hill where we''d raced as children. The modaks steamed in coconut leaves, their sweet filling reminding me of our aunt''s kitchen. "This window is for you to watch the rains," he said, knowing monsoon watching was our shared joy.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746104043/Screenshot_2025-05-01_091943_2_yxxzq4.png', '2007-01-20', TRUE),
(1, 'Carrom Championship', 'Amit''s triumphant whoop echoed when he sunk the last piece, while Naina pouted dramatically. "Ajji let us win!" she accused, though we all saw her secretly coaching him. The wooden striker''s smooth weight in my palm felt like generations passing the game forward.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746103319/gettyimages-649878646-640x640_hrubsk.jpg', '2018-06-01', TRUE),
(1, 'Thai Curry Lessons', 'Meena''s hands guided mine as we crushed lemongrass, its citrusy scent cutting through the coconut milk. Anita''s laughter rang out when I accidentally used green chilies instead of bell peppers. The resulting tears and shared water glasses became our favorite part of the recipe.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746102299/OIP_armcgq.jpg', '2017-09-18', TRUE),
(1, 'Sibling Rakhi Circle', 'Suresh pretended to protest as Radha tied the rakhi, just like when we were young. His exaggerated winks at me during the puja mirrored our childhood conspiracy against chores. The shared memory of Amma''s proud smile hung unspoken between us three.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100667/Screenshot_2025-05-01_092419_ikdfdv.png', '2010-08-24', TRUE),
(1, 'Naina''s Bharatanatyam', 'Naina''s ankle bells created a storm of sound as she spun, her expression transforming into the goddess she portrayed. When her eyes met mine during the final pose, I saw my mother''s passion alive in her. The jasmine in her hair scented my saree long after we hugged.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100694/Screenshot_2025-05-01_092522_udklrc.png', '2013-09-14', TRUE),
(1, 'Diwali Together', 'Vikram''s steady hands guided Amit''s while lighting diyas. Meena adjusted Naina''s lehenga with the same care she''d shown for Vikram''s school uniform years ago. As fireworks painted the sky, Anita squeezed my shoulder - our silent tradition since her first Diwali away from home.', 'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746100699/Screenshot_2025-05-01_092613_xwamlu.png', '2020-11-13', TRUE);

INSERT INTO Memories (patient_id, title, descrip, image_url, memory_date, favorite)
VALUES 
(1, 'Naina''s School Play  “The Freedom Song”', 
'Naina''s shy smile from the stage in her tricolor saree is etched in my memory. Her lines about freedom stirred something deep in me.', 
'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746109886/Screenshot_2025-05-01_200113_jqwfkr.png', '2024-08-14', TRUE),

(1, 'Making Rakhi with Anita', 
'Anita sat beside me tying rakhis with colorful threads and beads. We laughed as we recalled how Vikram used to cry every Raksha Bandhan over the tikka.', 
'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746109973/Screenshot_2025-05-01_200241_dmcxfg.png', '2024-08-22', TRUE),


(1, 'Monsoon Tea with Meena', 
'One rainy afternoon, Meena and I sipped ginger tea and shared stories of motherhood. The smell of wet earth and pakoras still lingers in my mind.', 
'https://res.cloudinary.com/dxzq9uoh8/image/upload/v1746110060/Screenshot_2025-05-01_200406_tuea8o.png', '2024-08-11', TRUE);


INSERT INTO MemoryPeople (memory_id, person_id)
VALUES
(1, 1), -- Vikram's First School Day
(2, 1), (2, 2), -- Family Lunch with Meena and Vikram
(3, 3), -- Anita's College Farewell
(4, 4), -- Amit's School Play
(5, 5), -- Naina's 10th Birthday
(6, 6), -- Rakhi with Radha
(7, 7), -- Suresh's Family Visit
(8, 8), -- Dr. Shalini Consultation
(9, 9), -- Reunion with Maya
(10, 10), -- Bhajans with Usha
(11, 11), -- Coffee with Kavita
(12, 12), -- Deepak's Poetry Recital
(13, 13), -- Sunita's Farewell
(14, 14), -- Temple Visit with Ramesh
(15, 15), -- Ajit's Housewarming
(16, 4), (16, 5), -- Game Night with Grandkids
(17, 2), (17, 3), -- Cooking Day with Meena and Anita
(18, 6), (18, 7), -- Rakhi with Siblings
(19, 5), -- Naina's Dance Performance
(20, 1), (20, 2), (20, 3), (20, 4), (20, 5); -- Diwali with Family


INSERT INTO Tags (name, patient_id)
VALUES
('Family', 1),
('Grandchildren', 1),
('Festivals', 1),
('School Days', 1),
('Siblings', 1),
('Spirituality', 1),
('Health', 1),
('Friends', 1),
('Celebration', 1),
('Tradition', 1),
('Cooking', 1),
('Temple', 1);


INSERT INTO MemoryTags (memory_id, tag_id)
VALUES
(1, 1), (1, 4),
(2, 1), (2, 11),
(3, 1),
(4, 2),
(5, 2), (5, 9),
(6, 5),
(7, 5),
(8, 7),
(9, 8),
(10, 6),
(11, 8),
(12, 8),
(13, 8),
(14, 6), (14, 12),
(15, 1),
(16, 1), (16, 2),
(17, 1), (17, 11),
(18, 5),
(19, 2), (19, 9),
(20, 1), (20, 3), (20, 10);