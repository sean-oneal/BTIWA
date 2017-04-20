const mongoose = require('mongoose');
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/twitter-stream';

mongoose.connect(mongoUri);
mongoose.Promise = require('bluebird');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;