const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' })); // Allow JSON bodies up to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const memoriesRouter = require('./routes/memories');
const patientsRouter = require('./routes/patients');
const profileRouter = require('./routes/profile')
const peopleRouter = require('./routes/people');
app.use(cors());
app.use(bodyParser.json());  

app.use('/memories', memoriesRouter); 
app.use('/patients', patientsRouter);
app.use('/',profileRouter);
app.use('/',peopleRouter);

app.get('/', (req, res) => {
  res.send('Memory Archive Backend Running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
