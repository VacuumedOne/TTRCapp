module.exports = function () {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  
  client.connect((err) => {
    if(err) throw err;
    else console.log("Connected Successfully to MongoDB.");

    const db = client.db('Test'); //データベースの取得

    const collection = db.collection();
    collection.insertOne({
      user_id: 0,
      user_name: 'bob',
      hashed_pw: 'yguhinjkml'
    }, (err, result) => {
      if(err) throw err;
      else console.log("Successfully Inserted: " + result);
    });
    client.close();
  });
}