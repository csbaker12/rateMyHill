const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/user');
const resorts = require('./routes/resort');
const reviews = require('./routes/review');
require('dotenv').config();
const { checkToken } = require('./middleware/auth');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {});

app.use(bodyParser.json());
app.use(checkToken);
app.use('/user', users);
app.use('/resort', resorts);
app.use('/review', reviews);

app.use(express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
