const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
var users = [
  { id: 1, name: 'elice' },
  { id: 2, name: 'bak' },
  { id: 3, name: 'chris' },
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'));

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  let limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    res.status(400);
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req,res) => {
  let id = parseInt(req.params.id,10);
  if(Number.isNaN(id)) return res.status(400).end();

  let user = users.filter((user) => user.id === id)[0];
  if(!user) return res.status(404).end();
  res.json(user);
})

app.delete('/users/:id', (req,res)=>{
  let id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();
  users.filter(user => user.id !== id);
  res.status(204).end();
})

app.post('/users', (req,res)=>{
  let name = req.body.name;
  if(!name) return res.status(400).end();

  let isConfict = users.filter(user => user.name === name).length
  if(isConfict) return res.status(409).end();

  let id = Date.now();
  let user = {id, name};
  users.push(user);
  res.status(201).json(user);
})

app.put('/users/:id', (req,res)=>{
  let id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();
  
  let name = req.body.name;
  if(!name) return res.status(400).end();
  let isConfict = users.filter(user => user.name === name).length
  if(isConfict) return res.status(409).end();

  let user = users.filter(user=>user.id === id)[0];
  if(!user) return res.status(404).end();

  user.name = name;
  res.json(user);
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
