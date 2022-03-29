const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const user = require('./api/user/index.js')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}
app.use('/users', user);

module.exports = app;
