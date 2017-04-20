var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/twitter-stream';

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect('mongodb://localhost/twitter-stream');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;