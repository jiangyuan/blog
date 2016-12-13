'use strict';

const express = require('express');
const app = express();
const parse = require('./lib/parse');
let config = require('./config');

const data = parse(config);

app.get('/', (req, res) => {
  res.send('hello my blod');
});

app.listen(3000, () => {
  console.log('start at 3000');
});
