const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const config = require('./config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));

app.set('jwt-secret', config.secret);

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('server is running');
});

mongoose.connect(config.mongodbUri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('DB connected');
});