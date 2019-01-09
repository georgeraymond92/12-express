'use strict';

const express = require('express');
const uuid = require('uuid');
const app = express();


const PORT = process.env.PORT || 8080;

let db = [
  {
    'name': 'name',
    'author': 'author',
    'title': 'book',
    'article': 'article',
    'id': '3a6303e9-b784-4d22-94f3-a85a1d67e15c',
  },
  {
    'name': 'name',
    'author': 'author',
    'title': 'book',
    'article': 'article',
    'id': '8963265b-e4a9-405d-a1e9-375795c93743',
  },
];

app.use(express.json());

app.use( (req,res,next) => {
  console.log('LOG:', req.method, req.path);
  next();
});

app.get('/posts', (req,res,next) => {
  let count = db.length;
  let results = db;
  res.json({count,results});
});

app.get('/posts/:id', (req,res,next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});


app.post('/posts', (req,res,next) => {
  let {name,author,title,article} = req.body;
  let record = {name,author,title,article};
  record.id = uuid();
  db.push(record);
  res.json(record);
});

app.put('/posts/:id', (req,res,next) => {

  for(let i = 0;i < db.length; i++){

    if(db[i].id === req.params.id){
      db[i] = req.body;
      db[i].id = uuid();
    }

  }

  res.status(200).send(`updated object at id ${req.params.id}`);
  
});

app.delete('/posts/:id', (req,res,next) => {
  db = db.filter(function(ele){
    return ele.id != req.params.id;
  });
  res.status(200).send(`succesfully deleted object at id:${req.params.id}`);
  
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

