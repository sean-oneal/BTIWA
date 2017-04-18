'use strict';

const express = require('express');
const path = require('path');

const app = express();
//TODO body-parser
//
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', function(req, res) {
  return res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

console.log('Server is listening on port 8090 👻');

app.listen(8090);