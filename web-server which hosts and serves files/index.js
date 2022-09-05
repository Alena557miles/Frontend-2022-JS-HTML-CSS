const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const { filesRouter } = require('./filesRouter.js');

app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/files', filesRouter);

const start = async () => {
  try {
    if (!fs.existsSync('files')) {
      fs.mkdirSync('files');
    }
    app.listen(8080);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
}

start();

//ERROR HANDLER
app.use(errorHandler)

function errorHandler (err, req, res, next) {
  console.error('err')
  res.status(500).send({'message': 'Server error'});
}
