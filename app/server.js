const express = require('express');
const dbTools = require('./modules/dbTools');

const port = 8000 || process.env.PORT;
const app = express();

app
  .use(express.static('client'))

  .get('/', dbTools.getLangs)
  .get('/:lang', dbTools.getPoemsByLang)
  .get('/authors/:id', dbTools.getAuthor)
  .get('/translations/:id', dbTools.getTranslations)
  .get('/comments/:id', dbTools.getComments)

  .use((err, req, res, next) => {
    console.log(err);
    res.json(err);
  })

  .listen(port, () => {
    console.log(`Listening in ${port}`);
  });
