const mongoClient = require('mongodb').MongoClient;
const database = mongoClient.connect("mongodb://localhost:27017/chatappDb", function(err, data) {
    if(!err)
    {
        console.log('Connected Successfully to server');
        database = data.db("test");
    }
});
