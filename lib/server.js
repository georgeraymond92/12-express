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

class Data {
  constructor(body) {
    if(body.name && body.author && body.title && body.article){
      this.name = body.name;
      this.author = body.author;
      this.title = body.title;
      this.article = body.article;
      this.id = uuid();
    }
  }
}

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
  let data = new Data(req.body);
  if(data.name) {
    db.push(data);
    res.json(data);
    res.status(200).send('post successful');
  }else{
    res.status(400).send(`Git dat post out of here!!`);
  }

});

app.put('/posts/:id', (req,res,next) => {
  let data = new Data(req.body);
  for(let i = 0;i < db.length; i++){

    if(db[i].id === data.id){
      db[i] = data;
      db[i].id = uuid();
      console.log(db[i]);
      res.status(200).send(`updated object at id ${req.params.id}`);
    }else{
      res.status(400).send(`bad request`);
    }

  }

  
  
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

