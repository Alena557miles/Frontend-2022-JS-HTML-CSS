const express = require('express');

const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/dbConnection');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const notesRoute = require('./routes/notesRoute');

const authMiddleware = require('./middleware/authMiddleware');

const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to db');
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/notes', authMiddleware, notesRoute);

// ERROR HANDLER
app.use(errorHandler);
