var express = require('express');
var app = express();

var cors = require('cors');

var blogItems = require('./data').blogItems;

app.use(cors());

app.get('/', function (req, res) {
  res.json(blogItems);
});

app.listen(3001, function () {
  console.log('Server listening on port 3001');
});
