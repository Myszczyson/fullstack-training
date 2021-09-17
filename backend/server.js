require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const passportConfig = require('./config/passport');
const session = require('express-session');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');

const postsRoutes = require('./routes/posts.routes');

const app = express();

// init session mechanism
app.use(session({ secret: 'anything' }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

/* MIDDLEWARE */
app.use(helmet());
app.use(sanitize());
app.use(cors({
  origin: 'http://localhost:3000',
  resave: false,
  saveUninitialized: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/auth', require('./routes/auth.routes'));

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
