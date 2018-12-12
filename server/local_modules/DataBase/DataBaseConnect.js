module.exports = function () {
  const mongodbClient = require('mongodb').MongoClient;
  const connectUrl = 'mongodb://127.0.0.1:27017';
  
  mongodbClient.connect(connectUrl, (err, db) => {
    if(err) throw err;
  });
}