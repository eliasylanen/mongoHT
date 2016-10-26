const mongo = require('mongodb');

const url = 'mongodb://admin:admin69@ds031257.mlab.com:31257/poem-service';
const mongoClient = mongo.MongoClient;

module.exports = {
  url,
  mongoClient,
};
