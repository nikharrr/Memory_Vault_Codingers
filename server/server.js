const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const memoriesRouter = require('./routes/memories');
const patientsRouter = require('./routes/patients');
const profileRouter = require('./routes/profile')

app.use(cors());
app.use(bodyParser.json());

app.use('/memories', memoriesRouter); 
app.use('/patients', patientsRouter);
app.use('/',profileRouter);

app.get('/', (req, res) => {
  res.send('Memory Archive Backend Running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
