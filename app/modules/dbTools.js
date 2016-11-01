const mongo = require('mongodb');

const url = 'mongodb://admin:admin69@ds031257.mlab.com:31257/poem-service';
const mongoClient = mongo.MongoClient;

module.exports = {
  url,
  mongoClient,
  getLangs,
  getPoemsByLang,
  getAuthor,
  getTranslations,
  getComments,
};

function getLangs(req, res, next) {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      db.close();
      next({ success: false, msg: 'Error connecting to db' });
    }
    db.collection('Poem').aggregate([
      {
        $group: {
          _id: '$lang',
          count: { $sum: 1 },
        },
      },
    ]).toArray()
      .then(data => {
        res.json({ success: true, msg: data });
        db.close();
      })
      .catch(queryErr => {
        db.close();
        next({ success: false, msg: queryErr });
      });
  });
}

function getPoemsByLang(req, res, next) {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      db.close();
      next({ success: false, msg: 'Error connecting to db' });
    }
    db.collection('Poem').find({ lang: req.params.lang }).toArray()
      .then(data => {
        res.json({ success: true, msg: data });
        db.close();
      })
      .catch(queryErr => {
        db.close();
        next({ success: false, msg: queryErr });
      });
  });
}

function getAuthor(req, res, next) {
  console.log(req.params.id);
  mongoClient.connect(url, (err, db) => {
    if (err) {
      db.close();
      next({ success: false, msg: 'Error connecting to db' });
    }
    db.collection('Author').findOne({ _id: new mongo.ObjectID(req.params.id) })
      .then(data => {
        console.log(data);
        res.json({ success: true, msg: data });
        db.close();
      })
      .catch(queryErr => {
        db.close();
        next({ success: false, msg: queryErr });
      });
  });
}

function getTranslations(req, res, next) {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      db.close();
      next({ success: false, msg: 'Error connecting to db' });
    }
    db.collection(`translations_${req.params.id}`).find({}).toArray()
      .then(data => {
        res.json({ success: true, msg: data });
        db.close();
      })
      .catch(queryErr => {
        db.close();
        next({ success: false, msg: queryErr });
      });
  });
}

function getComments(req, res, next) {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      db.close();
      next({ success: false, msg: 'Error connecting to db' });
    }
    db.collection(`comments_${req.params.id}`).find({}).toArray()
      .then(data => {
        res.json({ success: true, msg: data });
        db.close();
      })
      .catch(queryErr => {
        db.close();
        next({ success: false, msg: queryErr });
      });
  });
}
