const express = require('express');
const dbTools = require('./modules/dbTools');

const port = 8000 || process.env.PORT;
const app = express();

app
  .use(express.static('client'))

  .use((req, res, next) => {
    dbTools.mongoClient.connect(dbTools.url, (err, db) => {
      if (err) next('Error connecting to db');
      console.log('Connected to db');
      next();
    });
  })

  .use((err, req, res, next) => {
    console.log(err);
    res.json(err);
  })

  .listen(port, () => {
    console.log(`Listening in ${port}`);
  });
