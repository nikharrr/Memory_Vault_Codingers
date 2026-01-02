const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' })); // Allow JSON bodies up to 50MB
app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(cookieParser()); // Use cookie-parser middleware

const memoriesRouter = require('./routes/memories');
const patientsRouter = require('./routes/patients');
const profileRouter = require('./routes/profile')
const peopleRouter = require('./routes/people');
const searchbarRouter = require('./routes/searchbar');

app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your client's origin
  credentials: true
}));
app.use(bodyParser.json());

app.use('/memories',memoriesRouter);
app.use('/patients',patientsRouter);
app.use('/',profileRouter);
app.use('/',peopleRouter);
app.use('/',searchbarRouter);

app.get('/',(req,res) => {
  res.send('Memory Archive Backend Running');
});

app.listen(port,() => {
  console.log(`Server is running on port ${port}`);
});
