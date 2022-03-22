const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;
var users = [
  { id: 1, name: 'elice' },
  { id: 2, name: 'bak' },
  { id: 3, name: 'chris' },
];

app.use(morgan('dev'));
app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  let limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    res.status(400);
  }
  res.json(users.slice(0, limit));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
